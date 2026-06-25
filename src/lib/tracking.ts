import { META_PIXEL } from './config'

// =====================================================================
// Meta Pixel (browser) — PageView ONLY.
//
// Health & Wellness preventive posture: the browser fires NO conversion
// events (no Purchase / Lead / InitiateCheckout / Schedule / CompleteReg).
// The only browser event is PageView, enriched with Manual Advanced Matching
// (hashed identity) so it still matches at high EMQ. All conversion signals
// come from the server (custom `sales` CAPI) + the Apps Script downstream.
// =====================================================================

type MetaParams = Record<string, unknown>

interface FbqWindow {
  fbq?: ((cmd: 'init', id: string, params?: MetaParams) => void) &
    ((cmd: 'track', event: string, params?: MetaParams) => void) & {
      callMethod?: unknown
      queue?: unknown[]
      loaded?: boolean
      version?: string
      push?: unknown
    }
  _fbq?: unknown
}

// First-party cookie holding the hashed Advanced Matching values so EVERY
// PageView (not just the one after form-fill) inherits identity. 30-day TTL.
const MAM_COOKIE = 'svd_mam'
const MAM_TTL_SECONDS = 30 * 24 * 60 * 60

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
  // Re-init with any persisted Advanced Matching BEFORE the first PageView so
  // returning visitors fire an identified PageView (high EMQ).
  const mam = readMamCookie()
  if (mam && Object.keys(mam).length) {
    w.fbq?.('init', META_PIXEL.id, mam)
  }
  w.fbq?.('track', 'PageView')
  pixelInitialised = true
}

export function pixelTrack(event: string, params: MetaParams = {}): void {
  const w = window as unknown as FbqWindow
  if (!w.fbq) return
  w.fbq('track', event, params)
}

// =====================================================================
// Manual Advanced Matching (MAM) — hashed identity for PageView EMQ.
// =====================================================================

export interface MatchingInput {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  /** 2-letter ISO (e.g. "IN"); case-insensitive. */
  country?: string
}

/** SHA-256 hex via Web Crypto (HTTPS + http://localhost). Pre-hashing means the
 * cookie never stores plain PII; Meta treats 64-char hex as already-hashed. */
async function sha256Hex(value: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle) return value
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function buildMatching(d: MatchingInput): Promise<Record<string, string>> {
  const norm: Record<string, string | undefined> = {}
  if (d.email) norm.em = d.email.trim().toLowerCase()
  if (d.phone) {
    const digits = d.phone.replace(/\D/g, '')
    if (digits) norm.ph = digits
  }
  if (d.firstName) norm.fn = d.firstName.trim().toLowerCase()
  if (d.lastName) norm.ln = d.lastName.trim().toLowerCase()
  if (d.city) {
    const ct = d.city.trim().toLowerCase().replace(/[^a-z]/g, '')
    if (ct) norm.ct = ct
  }
  if (d.country) {
    const country = d.country.trim().toLowerCase()
    if (country) norm.country = country
  }

  const keys = Object.keys(norm) as Array<keyof typeof norm>
  const hashes = await Promise.all(keys.map((k) => sha256Hex(norm[k] as string)))
  const matching: Record<string, string> = {}
  keys.forEach((k, i) => {
    matching[k as string] = hashes[i]
  })
  // external_id MUST equal sha256(email) and match the server CAPI value.
  if (matching.em) matching.external_id = matching.em
  return matching
}

function writeMamCookie(matching: Record<string, string>) {
  if (typeof document === 'undefined') return
  if (Object.keys(matching).length === 0) return
  const value = encodeURIComponent(JSON.stringify(matching))
  document.cookie = `${MAM_COOKIE}=${value}; Path=/; Max-Age=${MAM_TTL_SECONDS}; SameSite=Lax`
}

function readMamCookie(): Record<string, string> | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${MAM_COOKIE}=([^;]+)`))
  if (!match) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]))
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

/**
 * Re-init the pixel with hashed Advanced Matching from raw form values, and
 * persist them to the first-party cookie. Call on form-fill + on payment
 * success. Subsequent PageViews inherit this identity.
 */
export async function setMetaAdvancedMatching(d: MatchingInput): Promise<void> {
  const w = window as unknown as FbqWindow
  if (!w.fbq || !META_PIXEL.id) return
  const matching = await buildMatching(d)
  if (Object.keys(matching).length === 0) return
  w.fbq('init', META_PIXEL.id, matching)
  writeMamCookie(matching)
}

/** Safety net: re-apply MAM from the persisted cookie (e.g. on /thank-you). */
export function reapplyMamFromCookie(): void {
  const w = window as unknown as FbqWindow
  if (!w.fbq || !META_PIXEL.id) return
  const matching = readMamCookie()
  if (!matching || Object.keys(matching).length === 0) return
  w.fbq('init', META_PIXEL.id, matching)
}
