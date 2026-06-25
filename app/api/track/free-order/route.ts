import {
  firePurchaseTracking,
  type TrackingPayload,
} from '@/lib/server/purchaseTracking'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

/**
 * 100%-off coupon path — there is no Razorpay payment to verify, so this route
 * ONLY writes the Pabbly CRM row (flagged is_test). CAPI is intentionally NOT
 * fired (free/test orders must never report as conversions); firePurchaseTracking
 * is called with fireCapi=false and the payload's isTest=true also enforces it.
 */
export async function POST(req: Request): Promise<Response> {
  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    body = {}
  }

  const paymentId =
    typeof body.paymentId === 'string' && body.paymentId ? body.paymentId : ''
  if (!paymentId) {
    return json(400, { error: 'Missing paymentId', code: 'BAD_REQUEST' })
  }

  const tracking = { ...(body.tracking ?? {}), isTest: true } as TrackingPayload
  try {
    await firePurchaseTracking(req, paymentId, tracking, false)
  } catch (err) {
    console.error('[free-order] tracking failed', err)
  }

  return json(200, { ok: true })
}
