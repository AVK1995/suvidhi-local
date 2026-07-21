'use client'

/**
 * GA4 event helper — fires native `gtag('event', ...)` calls.
 *
 * IMPORTANT (why this exists as its own module):
 *  • These are pure event COUNTS — no `value`, no `currency`, no revenue params.
 *    That keeps GA4 numbers deliberately independent of Meta's monetary data.
 *  • Every event fires AT MOST ONCE PER BROWSER, ever (localStorage flag). These
 *    are reach/intent signals ("how many people did X"), not volume counts.
 *  • This is completely independent of the Meta Pixel / CAPI tracking. Never read
 *    from, depend on, or copy values out of Meta tracking here.
 *
 * The GA4 base tag (G-Q1RHVTJQJ7) lives in app/layout.tsx and is NOT host-gated,
 * so these events also fire on localhost — testable in DebugView.
 */

// Reuse the funnel's existing storage prefix (svd_utm_v1, svd_mam, …).
const PREFIX = 'svd_ga4_'

type GtagFn = (command: 'event', eventName: string, params?: Record<string, unknown>) => void

/**
 * Fire a GA4 event once per browser, ever.
 *
 * Ordering rules (learned the hard way):
 *  1. Bail BEFORE stamping if GA4 isn't present — otherwise the flag permanently
 *     suppresses the event for that browser and it can never fire on production.
 *  2. Stamp the flag BEFORE calling gtag — a CTA click navigates away immediately
 *     after, and an un-stamped flag double-fires.
 *  3. If localStorage throws (private mode), fire anyway — an extra count beats a
 *     lost one.
 *  4. Never throw into a click handler.
 */
export function trackGa4EventOnce(eventName: string): void {
  try {
    if (typeof window === 'undefined') return

    const gtag = (window as unknown as { gtag?: GtagFn }).gtag
    // Rule 1 — GA4 absent: do nothing, and do NOT stamp the flag.
    if (typeof gtag !== 'function') return

    const key = `${PREFIX}${eventName}_fired`

    let alreadyFired = false
    try {
      alreadyFired = window.localStorage.getItem(key) === '1'
    } catch {
      // Rule 3 — storage unavailable: best-effort, fire anyway.
      alreadyFired = false
    }
    if (alreadyFired) return

    // Rule 2 — stamp before firing.
    try {
      window.localStorage.setItem(key, '1')
    } catch {
      /* private mode — accept best-effort dedup */
    }

    // No params by design — pure event count, no value/currency.
    gtag('event', eventName)
  } catch {
    /* Rule 4 — analytics must never break the UI. */
  }
}
