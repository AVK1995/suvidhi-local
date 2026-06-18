import { META_PIXEL, PABBLY, BRAND, OFFER } from './config'
import {
  buildFullPayload,
  getFbCookies,
  utmPayload,
  type IdentityInput,
} from './utm'

// =====================================================================
// Meta Pixel
// =====================================================================

type MetaParams = Record<string, unknown>

interface FbqWindow {
  fbq?: ((cmd: 'init', id: string) => void) &
    ((cmd: 'track', event: string, params?: MetaParams) => void) &
    ((cmd: 'trackCustom', event: string, params?: MetaParams) => void) & {
      callMethod?: unknown
      queue?: unknown[]
      loaded?: boolean
      version?: string
      push?: unknown
    }
  _fbq?: unknown
}

let pixelInitialised = false

export function initMetaPixel(): void {
  if (pixelInitialised) return
  if (!META_PIXEL.id) return
  const w = window as unknown as FbqWindow
  if (w.fbq) {
    pixelInitialised = true
    return
  }
  const n: FbqWindow['fbq'] = function (...args: unknown[]) {
    const fn = (n as unknown as { callMethod?: (...a: unknown[]) => void }).callMethod
    if (fn) fn.apply(n, args)
    else (n as unknown as { queue: unknown[] }).queue.push(args)
  } as FbqWindow['fbq']
  ;(n as unknown as { push: FbqWindow['fbq'] }).push = n
  ;(n as unknown as { loaded: boolean }).loaded = true
  ;(n as unknown as { version: string }).version = '2.0'
  ;(n as unknown as { queue: unknown[] }).queue = []
  w.fbq = n
  w._fbq = n

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  w.fbq?.('init', META_PIXEL.id)
  w.fbq?.('track', 'PageView')
  pixelInitialised = true
}

export function pixelTrack(event: string, params: MetaParams = {}): void {
  const w = window as unknown as FbqWindow
  if (!w.fbq) return
  w.fbq('track', event, params)
}

export function pixelTrackCustom(event: string, params: MetaParams = {}): void {
  const w = window as unknown as FbqWindow
  if (!w.fbq) return
  w.fbq('trackCustom', event, params)
}

// =====================================================================
// Meta CAPI (server-side relay)
// =====================================================================

interface CapiUser {
  email?: string
  phone?: string
  name?: string
  externalId?: string
}

export async function capiTrack(
  event: string,
  user: CapiUser = {},
  custom: MetaParams = {},
): Promise<void> {
  if (!META_PIXEL.capiEndpoint) return
  try {
    const fb = getFbCookies()
    await fetch(META_PIXEL.capiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        action_source: 'website',
        test_event_code: META_PIXEL.testEventCode || undefined,
        user_data: { ...user, fbc: fb.fbc, fbp: fb.fbp },
        custom_data: custom,
        utm: utmPayload(),
      }),
      keepalive: true,
    })
  } catch {
    // analytics should never break UX
  }
}

// =====================================================================
// Pabbly Connect webhook
// =====================================================================

export type PabblyEventName =
  | 'lead.captured'
  | 'checkout.started'
  | 'coupon.applied'
  | 'payment.success'
  | 'payment.failed'
  | 'call.booked'

export interface PabblyEventInput extends IdentityInput {
  event: PabblyEventName
  coupon?: string
  orderId?: string
  paymentId?: string
  condition?: string
  hba1c?: string
  meta?: Record<string, unknown>
}

export async function pabblyEvent(input: PabblyEventInput): Promise<void> {
  if (!PABBLY.webhookUrl) return
  const payload = buildFullPayload({
    name: input.name,
    email: input.email,
    phone: input.phone,
    city: input.city,
    amount: input.amount,
    isTest: input.isTest,
  })
  try {
    await fetch(PABBLY.webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: input.event,
        brand: BRAND.name,
        product: OFFER.name,
        currency: OFFER.currency,
        // Extra business context Pabbly can branch on
        coupon: input.coupon ?? '',
        order_id: input.orderId ?? '',
        payment_id: input.paymentId ?? '',
        condition: input.condition ?? '',
        hba1c: input.hba1c ?? '',
        ...payload,
        meta: input.meta,
      }),
      keepalive: true,
    })
  } catch {
    /* ignore */
  }
}

// =====================================================================
// Milestone helper — pixel + CAPI + Pabbly in one call.
// =====================================================================

export function reportMilestone(
  event: 'Lead' | 'InitiateCheckout' | 'Purchase' | 'Schedule',
  payload: {
    name?: string
    email?: string
    phone?: string
    city?: string
    amount?: number
    orderId?: string
    paymentId?: string
    coupon?: string
    condition?: string
    hba1c?: string
    isTest?: boolean
  } = {},
): void {
  pixelTrack(event, {
    value: payload.amount,
    currency: OFFER.currency,
    coupon: payload.coupon,
  })
  capiTrack(
    event,
    { email: payload.email, phone: payload.phone, name: payload.name },
    { value: payload.amount, currency: OFFER.currency, coupon: payload.coupon },
  )
  const pabblyEventName: PabblyEventName =
    event === 'Lead'
      ? 'lead.captured'
      : event === 'InitiateCheckout'
      ? 'checkout.started'
      : event === 'Purchase'
      ? 'payment.success'
      : 'call.booked'
  pabblyEvent({
    event: pabblyEventName,
    ...payload,
  })
}
