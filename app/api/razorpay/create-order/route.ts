import Razorpay from 'razorpay'

// Razorpay's Node SDK is server-only — keep this handler on the Node runtime
// and never statically cached.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ''
const keySecret = process.env.RAZORPAY_KEY_SECRET ?? ''

// One client per server boot, reused across requests. Null until real
// credentials are present.
const rp =
  keyId && keySecret && !keyId.includes('REPLACE_ME') && !keySecret.includes('REPLACE_ME')
    ? new Razorpay({ key_id: keyId, key_secret: keySecret })
    : null

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export async function POST(req: Request): Promise<Response> {
  if (!rp) {
    return json(500, {
      error:
        'Razorpay credentials not configured. Add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env and restart `npm run dev`.',
      code: 'KEY_NOT_CONFIGURED',
    })
  }

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    body = {}
  }

  const amountRupees =
    typeof body.amount === 'number' && body.amount > 0 ? (body.amount as number) : 0
  if (amountRupees <= 0) {
    return json(400, {
      error: 'amount must be > 0 (in INR major units)',
      code: 'INVALID_AMOUNT',
    })
  }

  try {
    const order = await rp.orders.create({
      amount: Math.round(amountRupees * 100), // paise
      currency: (body.currency as string) ?? 'INR',
      receipt: body.receipt as string | undefined,
      notes: (body.notes ?? undefined) as Record<string, string> | undefined,
    })
    return json(200, order)
  } catch (e) {
    // Razorpay SDK errors carry { statusCode, error: { code, description, ... } }
    const err = e as {
      statusCode?: number
      error?: {
        code?: string
        description?: string
        source?: string
        step?: string
        reason?: string
      }
    }
    console.error('[razorpay] order create failed', err)
    return json(err.statusCode ?? 500, {
      error: err.error?.description ?? String(e),
      code: err.error?.code,
      source: err.error?.source,
      step: err.error?.step,
      reason: err.error?.reason,
      raw: err.error,
    })
  }
}
