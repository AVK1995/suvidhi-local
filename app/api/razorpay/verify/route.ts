import { createHmac } from 'node:crypto'
import {
  firePurchaseTracking,
  type TrackingPayload,
} from '@/lib/server/purchaseTracking'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const keySecret = process.env.RAZORPAY_KEY_SECRET ?? ''

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

// HMAC-SHA256 verifies the Razorpay success signature server-side, so a forged
// client "success" can never be trusted. ONLY after a valid signature do we fire
// the downstream Meta CAPI `sales` event + write the Pabbly CRM row — gating the
// tracking behind the same signature check means it can't be forged either.
export async function POST(req: Request): Promise<Response> {
  if (!keySecret || keySecret.includes('REPLACE_ME')) {
    return json(500, { error: 'Razorpay secret not configured', code: 'KEY_NOT_CONFIGURED' })
  }

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    body = {}
  }

  const orderId = body.razorpay_order_id
  const paymentId = body.razorpay_payment_id
  const signature = body.razorpay_signature
  if (
    typeof orderId !== 'string' ||
    typeof paymentId !== 'string' ||
    typeof signature !== 'string'
  ) {
    return json(400, { error: 'Missing required fields', code: 'BAD_REQUEST' })
  }

  const expected = createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')
  const valid = expected === signature

  // Verified, real payment → fire CAPI `sales` + Pabbly row (best-effort).
  if (valid) {
    const tracking = (body.tracking ?? {}) as TrackingPayload
    try {
      await firePurchaseTracking(req, paymentId, tracking, true)
    } catch (err) {
      console.error('[verify] purchase tracking failed', err)
    }
  }

  return json(200, { valid })
}
