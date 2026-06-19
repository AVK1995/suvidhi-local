// Shown while a route's client bundle loads (used as the `loading` UI for the
// per-route dynamic imports in app/). Mirrors the old React-Router Suspense
// fallback.
export function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex items-center gap-3 text-ink-700">
        <span className="w-4 h-4 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
        <span className="text-sm font-medium">Loading…</span>
      </div>
    </div>
  )
}
