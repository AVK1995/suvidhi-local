// UTM + identity persistence across the full funnel.
//
// • Captures URL params (utm_*, fbclid, gclid, msclkid) on every route.
// • Persists Meta CAPI dedupe cookies (_fbc, _fbp).
// • Mints + stores a stable `lead_id` and `external_id` once per browser.
// • Mints a `purchase_event_id` once per checkout session.
// • Helpers build a fully-shaped Pabbly / CAPI payload.

export type Utm = Partial<{
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  gclid: string
  fbclid: string
  msclkid: string
  referrer: string
  landing_page: string
  first_seen_at: string
}>

const URL_KEYS: (keyof Utm)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
]

const STORAGE_UTM = 'svd_utm_v1'

function safeStorage(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────
// UTM
// ─────────────────────────────────────────────────────────────────────

export function readUtmFromUrl(search: string = window.location.search): Utm {
  const params = new URLSearchParams(search)
  const out: Utm = {}
  for (const k of URL_KEYS) {
    const v = params.get(k)
    if (v) out[k] = v
  }
  return out
}

export function loadUtm(): Utm {
  const store = safeStorage()
  if (!store) return {}
  try {
    const raw = store.getItem(STORAGE_UTM)
    return raw ? (JSON.parse(raw) as Utm) : {}
  } catch {
    return {}
  }
}

export function saveUtm(patch: Utm): Utm {
  const store = safeStorage()
  const current = loadUtm()
  // First-touch attribution: only fill empty slots.
  const merged: Utm = { ...current }
  for (const k of Object.keys(patch) as (keyof Utm)[]) {
    const v = patch[k]
    if (v && !merged[k]) merged[k] = v
  }
  if (!merged.first_seen_at) merged.first_seen_at = new Date().toISOString()
  if (!merged.landing_page) merged.landing_page = window.location.pathname
  if (!merged.referrer && document.referrer) merged.referrer = document.referrer

  if (store) {
    try {
      store.setItem(STORAGE_UTM, JSON.stringify(merged))
    } catch {
      // ignore quota
    }
  }
  return merged
}

export function captureUtm(): Utm {
  const url = readUtmFromUrl()
  return saveUtm(url)
}

export function utmQueryString(extra: Record<string, string> = {}): string {
  const stored = loadUtm()
  const params = new URLSearchParams()
  for (const k of URL_KEYS) {
    const v = stored[k]
    if (v) params.set(k, v)
  }
  for (const [k, v] of Object.entries(extra)) {
    if (v) params.set(k, v)
  }
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export function appendUtm(url: string, extra: Record<string, string> = {}): string {
  if (!url) return url
  const qs = utmQueryString(extra)
  if (!qs) return url
  const sep = url.includes('?') ? '&' : ''
  return url + (qs.replace(/^\?/, sep ? sep : '?'))
}

// ─────────────────────────────────────────────────────────────────────
// Meta CAPI cookies (_fbc, _fbp)
//
// lead_id / external_id / purchase_event_id are no longer minted client-side:
// the server uses the Razorpay payment_id as lead_id + event_id and computes
// external_id = sha256(email). The browser only needs the fb cookies below.
// ─────────────────────────────────────────────────────────────────────

function readCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(
    new RegExp('(^|;\\s*)' + name + '=([^;]*)'),
  )
  return match ? decodeURIComponent(match[2]) : ''
}

/** Build `_fbc` from a `fbclid` if Meta hasn't already set it. */
function buildFbcFromClick(fbclid: string): string {
  if (!fbclid) return ''
  // Format: fb.1.<unix_ms>.<fbclid>
  return `fb.1.${Date.now()}.${fbclid}`
}

export function getFbCookies(): { fbc: string; fbp: string } {
  let fbc = readCookie('_fbc')
  const fbp = readCookie('_fbp')
  if (!fbc) {
    const stored = loadUtm()
    if (stored.fbclid) fbc = buildFbcFromClick(stored.fbclid)
  }
  return { fbc, fbp }
}

// ─────────────────────────────────────────────────────────────────────
// Name + phone parsing
// ─────────────────────────────────────────────────────────────────────

export function splitName(full?: string): { first_name: string; last_name: string } {
  const safe = (full ?? '').trim()
  if (!safe) return { first_name: '', last_name: '' }
  const parts = safe.split(/\s+/)
  if (parts.length === 1) return { first_name: parts[0], last_name: '' }
  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(' '),
  }
}

/** Best-effort country code extraction from an E.164 phone number. */
export function phoneCountryCode(phone?: string): string {
  if (!phone) return ''
  const m = phone.match(/^\+(\d{1,3})/)
  return m ? `+${m[1]}` : ''
}

// ─────────────────────────────────────────────────────────────────────
// UTM payload — attribution fields forwarded with the purchase to the server
// (which then writes them into the Pabbly CRM row + CAPI custom_data context).
// ─────────────────────────────────────────────────────────────────────

export function utmPayload(): Record<string, string> {
  const u = loadUtm()
  return {
    utm_source: u.utm_source ?? '',
    utm_medium: u.utm_medium ?? '',
    utm_campaign: u.utm_campaign ?? '',
    utm_term: u.utm_term ?? '',
    utm_content: u.utm_content ?? '',
    fbclid: u.fbclid ?? '',
  }
}
