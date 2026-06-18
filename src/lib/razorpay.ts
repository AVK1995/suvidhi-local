/**
 * Razorpay client integration — Suvidhi checkout.
 *
 *   client                                    server (dev: vite middleware)
 *   ──────                                    ──────────────────────────────
 *   startCheckout({...})
 *     │
 *     ├─ POST /api/razorpay/create-order ──── creates Razorpay Order with
 *     │   { id, amount, currency }            secret, returns order_id
 *     │
 *     ├─ loadCheckoutScript() ─── injects checkout.razorpay.com/v1/checkout.js
 *     │
 *     ├─ new Razorpay(opts).open() ────────── modal opens with order_id
 *     │
 *     │   (user pays)
 *     │
 *     ├─ handler({payment_id, order_id, signature})
 *     │   │
 *     │   ├─ POST /api/razorpay/verify ────── HMAC-SHA256 check with secret
 *     │   │   { valid: true }
 *     │   │
 *     └── onSuccess(response)
 *
 *   The secret never reaches the browser. The two endpoint paths are the
 *   contract — replicate them on prod (Cloudflare Worker / Vercel function
 *   / Express) and the client code does not change.
 */

import { BRAND, OFFER, RAZORPAY } from './config'

const CHECKOUT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js'

// ─── Public types ────────────────────────────────────────────────────

export interface PaymentSuccess {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface PaymentError {
  message: string
  code?: string
  reason?: string
  source?: string
  step?: string
  raw?: unknown
}

export interface CheckoutInput {
  /** Amount in INR major units. 1 = ₹1. */
  amount: number
  customer?: { name?: string; email?: string; phone?: string }
  notes?: Record<string, string>
  /** Internal receipt / reference (max 40 chars per Razorpay). */
  receipt?: string
  onSuccess: (r: PaymentSuccess) => void | Promise<void>
  onFailure?: (e: PaymentError) => void
  onDismiss?: () => void
}

// ─── Single entry point ──────────────────────────────────────────────

export async function startCheckout(input: CheckoutInput): Promise<void> {
  if (!RAZORPAY.keyId || RAZORPAY.keyId.includes('REPLACE_ME')) {
    input.onFailure?.({
      message:
        'VITE_RAZORPAY_KEY_ID is not configured in .env. Add it and restart `npm run dev`.',
      code: 'KEY_NOT_CONFIGURED',
    })
    return
  }

  // 1) Server creates the Razorpay Order
  const orderResult = await createOrder({
    amount: input.amount,
    receipt: input.receipt,
    notes: input.notes,
  })
  if (!orderResult.ok) {
    input.onFailure?.(orderResult.error)
    return
  }
  const order = orderResult.order

  // 2) Load the Razorpay browser SDK
  const loaded = await loadCheckoutScript()
  if (!loaded) {
    input.onFailure?.({
      message: 'Razorpay checkout script failed to load',
      code: 'SCRIPT_LOAD_FAILED',
    })
    return
  }
  const Razorpay = (window as RazorpayWindow).Razorpay
  if (!Razorpay) {
    input.onFailure?.({
      message: 'Razorpay constructor unavailable',
      code: 'SCRIPT_INIT_FAILED',
    })
    return
  }

  // 3) Open the modal wired to the server-issued order_id
  try {
    const rzp = new Razorpay({
      key: RAZORPAY.keyId,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      name: RAZORPAY.companyName,
      description: OFFER.name,
      prefill: {
        name: input.customer?.name ?? '',
        email: input.customer?.email ?? '',
        contact: input.customer?.phone ?? '',
      },
      notes: {
        product: OFFER.name,
        brand: BRAND.name,
        ...(input.notes ?? {}),
      },
      theme: { color: RAZORPAY.themeColor },
      retry: { enabled: true, max_count: 3 },
      remember_customer: false,
      modal: {
        ondismiss: () => input.onDismiss?.(),
        confirm_close: true,
        escape: true,
      },
      handler: async (response: PaymentSuccess) => {
        // 4) Verify signature server-side before trusting success
        const ok = await verifyPayment(response)
        if (!ok) {
          input.onFailure?.({
            message:
              'Payment was received but signature verification failed. Contact support before finalising.',
            code: 'SIGNATURE_INVALID',
          })
          return
        }
        await input.onSuccess(response)
      },
    })

    rzp.on('payment.failed', (e: unknown) => {
      const failure = normaliseFailure(e)
      // eslint-disable-next-line no-console
      console.error('[razorpay] payment.failed', failure, e)
      input.onFailure?.(failure)
    })

    rzp.open()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[razorpay] open() threw', e)
    input.onFailure?.({ message: String(e), code: 'OPEN_THREW', raw: e })
  }
}

// ─── Internals ───────────────────────────────────────────────────────

interface ServerOrder {
  id: string
  amount: number
  currency: string
}

type CreateOrderResult =
  | { ok: true; order: ServerOrder }
  | { ok: false; error: PaymentError }

async function createOrder(input: {
  amount: number
  receipt?: string
  notes?: Record<string, string>
}): Promise<CreateOrderResult> {
  try {
    const r = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: input.amount,
        currency: OFFER.currency,
        receipt: input.receipt,
        notes: input.notes,
      }),
    })
    const data = (await r.json()) as Record<string, unknown>
    if (r.ok && typeof data.id === 'string') {
      return {
        ok: true,
        order: {
          id: data.id,
          amount: data.amount as number,
          currency: data.currency as string,
        },
      }
    }
    const message =
      (typeof data.error === 'string' && (data.error as string)) ||
      'Razorpay order creation failed'
    const code = typeof data.code === 'string' ? (data.code as string) : undefined
    const isAuthFail = /authentication failed/i.test(message)
    return {
      ok: false,
      error: {
        message,
        code: code ?? (isAuthFail ? 'AUTHENTICATION_FAILED' : 'ORDER_CREATE_FAILED'),
        reason: isAuthFail
          ? 'The (key_id, key_secret) pair Razorpay received does not authenticate. Regenerate the live key in Razorpay Dashboard → Settings → API Keys, paste the new VITE_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET into .env, and restart `npm run dev`.'
          : typeof data.reason === 'string'
          ? (data.reason as string)
          : undefined,
        source: typeof data.source === 'string' ? (data.source as string) : undefined,
        step: typeof data.step === 'string' ? (data.step as string) : undefined,
        raw: data,
      },
    }
  } catch (e) {
    return {
      ok: false,
      error: {
        message:
          'Could not reach /api/razorpay/create-order. Is the dev server running? Did you restart after editing .env?',
        code: 'NETWORK_ERROR',
        raw: e,
      },
    }
  }
}

async function verifyPayment(input: PaymentSuccess): Promise<boolean> {
  try {
    const r = await fetch('/api/razorpay/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    const data = (await r.json()) as { valid?: boolean }
    return !!data.valid
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[razorpay] verifyPayment failed', e)
    return false
  }
}

function normaliseFailure(raw: unknown): PaymentError {
  const e = raw as
    | {
        error?: {
          code?: string
          description?: string
          source?: string
          reason?: string
          step?: string
          metadata?: { payment_id?: string; order_id?: string }
        }
      }
    | undefined
  const err = e?.error
  return {
    message: err?.description ?? 'Payment did not complete',
    code: err?.code,
    reason: err?.reason,
    source: err?.source,
    step: err?.step,
    raw,
  }
}

let scriptPromise: Promise<boolean> | null = null

function loadCheckoutScript(): Promise<boolean> {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve) => {
    if ((window as RazorpayWindow).Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = CHECKOUT_SCRIPT
    s.async = true
    s.onload = () => resolve(true)
    s.onerror = () => {
      scriptPromise = null
      resolve(false)
    }
    document.head.appendChild(s)
  })
  return scriptPromise
}

interface RazorpayWindow {
  Razorpay?: new (opts: Record<string, unknown>) => {
    open: () => void
    on: (event: string, cb: (e: unknown) => void) => void
  }
}
