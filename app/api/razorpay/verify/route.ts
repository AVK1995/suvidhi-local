import { createHmac } from 'node:crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const keySecret = process.env.RAZORPAY_KEY_SECRET ?? ''

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

/**
 * SLIM signature check — UX gate only.
 *
 * HMAC-SHA256 verifies the Razorpay success signature so a forged client
 * "success" can never advance the user to the confirmation flow.
 *
 * This route deliberately fires NO tracking. Pabbly + Meta CAPI moved to
 * /api/razorpay/webhook (server-to-server), because this route only runs when
 * the buyer's browser returns from the Razorpay modal — UPI-app payers often
 * never come back, and we were silently losing those conversions.
 */
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

  return json(200, { valid: expected === signature })
}
