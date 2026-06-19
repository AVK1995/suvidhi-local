// Carries funnel state across client navigations.
//
// React Router let us pass data via `navigate(path, { state })` and read it
// with `useLocation().state`. Next.js has no router state, so we stash the
// hand-off object in sessionStorage instead: written right before
// `router.push(...)` and read once on the destination page. Scoped to the tab
// and cleared when the tab closes — same lifetime spirit as the old location
// state, and it survives an accidental refresh mid-funnel.

const KEY = 'svd_funnel_state'

export function setFunnelState(value: unknown): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    /* ignore quota / unavailable storage */
  }
}

export function getFunnelState<T>(): T | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}
