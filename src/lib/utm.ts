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
const STORAGE_LEAD = 'svd_lead_id'
const STORAGE_EXT_ID = 'svd_external_id'
const STORAGE_PURCHASE_EVT = 'svd_purchase_event_id'

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
// Identity helpers (lead_id, external_id, purchase_event_id)
// ─────────────────────────────────────────────────────────────────────

function uuid(): string {
  // crypto.randomUUID is available in all modern browsers; fallback for
  // environments where it isn't.
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return (crypto as Crypto & { randomUUID: () => string }).randomUUID()
    }
  } catch {
    /* noop */
  }
  // RFC4122-ish fallback
  const rnd = (n: number) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  return `${rnd(8)}-${rnd(4)}-4${rnd(3)}-a${rnd(3)}-${rnd(12)}`
}

function getOrMint(key: string, prefix = ''): string {
  const store = safeStorage()
  const existing = store?.getItem(key)
  if (existing) return existing
  const value = prefix ? `${prefix}${uuid()}` : uuid()
  try {
    store?.setItem(key, value)
  } catch {
    /* ignore */
  }
  return value
}

export function getLeadId(): string {
  return getOrMint(STORAGE_LEAD, 'lead_')
}

export function getExternalId(): string {
  return getOrMint(STORAGE_EXT_ID, 'ext_')
}

/**
 * Per-checkout event id. Pass `regenerate: true` after a purchase to mint
 * a fresh id for the next attempt.
 */
export function getPurchaseEventId(regenerate = false): string {
  const store = safeStorage()
  if (regenerate) {
    try {
      store?.removeItem(STORAGE_PURCHASE_EVT)
    } catch {
      /* ignore */
    }
  }
  return getOrMint(STORAGE_PURCHASE_EVT, 'pevt_')
}

// ─────────────────────────────────────────────────────────────────────
// Meta CAPI cookies (_fbc, _fbp)
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
// Aggregate payload — what every Pabbly / CAPI event ships with.
// ─────────────────────────────────────────────────────────────────────

export interface IdentityInput {
  name?: string
  email?: string
  phone?: string
  city?: string
  amount?: number
  isTest?: boolean
}

export interface FullEventPayload extends Record<string, string | number | boolean> {
  lead_id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  city: string
  country_code: string
  fbc: string
  fbp: string
  client_ip_address: string
  client_user_agent: string
  external_id: string
  event_source_url: string
  amount: number
  is_test: boolean
  purchase_event_id: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  fbclid: string
  // Post-event placeholders — Pabbly maps them to columns even when empty.
  attended: string
  showup_time: string
  leadshowup_capi_event_id: string
  leadshowup_capi_sent: string
  qualified: string
  qualified_time: string
  qualified_capi_event_id: string
  qualified_capi_sent: string
  sale_closed: string
  contracted_value: string
  sales_time: string
  htsale_capi_event_id: string
  htsale_capi_sent: string
}

export function buildFullPayload(input: IdentityInput = {}): FullEventPayload {
  const { first_name, last_name } = splitName(input.name)
  const utm = loadUtm()
  const fb = getFbCookies()
  return {
    lead_id: getLeadId(),
    created_at: new Date().toISOString(),
    first_name,
    last_name,
    email: input.email ?? '',
    phone: input.phone ?? '',
    city: input.city ?? '',
    country_code: phoneCountryCode(input.phone),
    fbc: fb.fbc,
    fbp: fb.fbp,
    // client_ip_address is server-side; left blank for the client edge to
    // populate before forwarding to CAPI.
    client_ip_address: '',
    client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    external_id: getExternalId(),
    event_source_url: typeof window !== 'undefined' ? window.location.href : '',
    amount: typeof input.amount === 'number' ? input.amount : 0,
    is_test: input.isTest ?? false,
    purchase_event_id: getPurchaseEventId(),
    utm_source: utm.utm_source ?? '',
    utm_medium: utm.utm_medium ?? '',
    utm_campaign: utm.utm_campaign ?? '',
    utm_content: utm.utm_content ?? '',
    utm_term: utm.utm_term ?? '',
    fbclid: utm.fbclid ?? '',
    // The "post-call" columns Pabbly maps for show-up + qualification +
    // closed-won. They're empty at lead capture but the keys MUST be present
    // so Pabbly can keep its column alignment.
    attended: '',
    showup_time: '',
    leadshowup_capi_event_id: '',
    leadshowup_capi_sent: '',
    qualified: '',
    qualified_time: '',
    qualified_capi_event_id: '',
    qualified_capi_sent: '',
    sale_closed: '',
    contracted_value: '',
    sales_time: '',
    htsale_capi_event_id: '',
    htsale_capi_sent: '',
  }
}

// Legacy shorter helper, kept for backwards compatibility with existing call sites.
export function utmPayload(): Partial<FullEventPayload> {
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
