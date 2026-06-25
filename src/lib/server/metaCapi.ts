/**
 * Server-side Meta Conversions API — Suvidhi (Postpartum Restore funnel).
 *
 * HEALTH & WELLNESS PREVENTIVE POSTURE:
 *   This funnel is postpartum (a Meta "Health & wellness condition" category).
 *   We therefore fire ONLY a neutral custom event ("sales") server-side and
 *   NEVER the standard `Purchase` (which Meta restricts by name for H&W
 *   datasets). custom_data is kept strictly PHI-free (value/currency/payment_id),
 *   and event_source_url is reduced to host-only origin so no path/UTM/health-y
 *   segment leaks. See docs in META_TRACKING_AGENT_GUIDE Section 0.
 *
 * Talks DIRECTLY to graph.facebook.com (no proxy). The access token is a
 * server-only secret (process.env.META_CAPI_ACCESS_TOKEN) — never NEXT_PUBLIC.
 */

import crypto from 'node:crypto'

const GRAPH_API_VERSION_DEFAULT = 'v25.0'

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex')
}

export interface SalesEventInput {
  pixelId: string
  accessToken: string
  apiVersion?: string
  testEventCode?: string
  /** Custom event name. Default 'sales'. NEVER a restricted standard name. */
  eventName?: string
  /** Razorpay payment_id — used as the deterministic event_id. */
  paymentId: string
  email: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  /** 2-letter ISO country (e.g. "IN"). */
  countryCode?: string
  /** Full client URL — reduced to host-only origin before sending. */
  eventSourceUrl?: string
  fbc?: string
  fbp?: string
  clientIp?: string
  clientUserAgent?: string
  /** Amount in major units (rupees), NOT paise. */
  valueRupees: number
  currency: string
}

export interface CapiResult {
  ok: boolean
  status: number
  body: string
}

/** Reduce a URL to its host-only origin (H&W: strip path/query). */
export function hostOnlyUrl(url: string): string {
  if (!url) return ''
  try {
    return new URL(url).origin
  } catch {
    return url
  }
}

/**
 * Fire the single custom `sales` event to Meta CAPI with full EMQ user_data.
 * Returns a result object; never throws (analytics must not break the payment
 * response). The CALLER is responsible for skipping test/free orders.
 */
export async function sendSalesEvent(input: SalesEventInput): Promise<CapiResult> {
  const apiVersion = input.apiVersion || GRAPH_API_VERSION_DEFAULT

  // Normalise + hash matching signals (Meta spec).
  const email = input.email.trim().toLowerCase()
  const hashedEmail = email ? sha256(email) : undefined
  const phoneDigits = (input.phone ?? '').replace(/\D/g, '')
  const fn = (input.firstName ?? '').trim().toLowerCase()
  const ln = (input.lastName ?? '').trim().toLowerCase()
  const ct = (input.city ?? '').trim().toLowerCase().replace(/[^a-z]/g, '')
  const country = (input.countryCode ?? '').trim().toLowerCase()

  const userData: Record<string, unknown> = {}
  if (hashedEmail) {
    userData.em = [hashedEmail]
    // external_id MUST equal sha256(email) and match the browser MAM value.
    userData.external_id = [hashedEmail]
  }
  if (phoneDigits) userData.ph = [sha256(phoneDigits)]
  if (fn) userData.fn = [sha256(fn)]
  if (ln) userData.ln = [sha256(ln)]
  if (ct) userData.ct = [sha256(ct)]
  if (country) userData.country = [sha256(country)]
  // Raw context — never hashed.
  if (input.fbc) userData.fbc = input.fbc
  if (input.fbp) userData.fbp = input.fbp
  if (input.clientIp) userData.client_ip_address = input.clientIp
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent

  const eventSourceUrl = hostOnlyUrl(input.eventSourceUrl ?? '')

  const event: Record<string, unknown> = {
    event_name: input.eventName || 'sales',
    event_time: Math.floor(Date.now() / 1000),
    event_id: input.paymentId,
    action_source: 'website',
    user_data: userData,
    // PHI-FREE custom_data only. Never add content_name / product / condition.
    custom_data: {
      currency: input.currency,
      value: input.valueRupees,
      payment_id: input.paymentId,
    },
  }
  if (eventSourceUrl) event.event_source_url = eventSourceUrl

  const payload: Record<string, unknown> = { data: [event] }
  if (input.testEventCode) payload.test_event_code = input.testEventCode

  const url =
    `https://graph.facebook.com/${apiVersion}/${input.pixelId}/events` +
    `?access_token=${encodeURIComponent(input.accessToken)}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const body = await res.text()
    return { ok: res.ok, status: res.status, body }
  } catch (err) {
    return { ok: false, status: 0, body: String(err) }
  }
}
