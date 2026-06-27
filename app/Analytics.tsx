'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { captureUtm } from '@/lib/utm'
import { initMetaPixel, pixelTrack } from '@/lib/tracking'

// Run a callback when the browser is idle (or shortly after), so analytics
// boot never competes with hydration / the critical render path. Falls back to
// a timeout where requestIdleCallback isn't available (Safari).
function onIdle(cb: () => void) {
  if (typeof window === 'undefined') return
  const ric = (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  }).requestIdleCallback
  if (ric) ric(cb, { timeout: 3000 })
  else window.setTimeout(cb, 2000)
}

// App-wide analytics side-effects, hoisted out of the old React-Router
// <GlobalEffects>. Initialises the Meta Pixel once (deferred to idle), then
// re-captures UTM params and fires a PageView on every client-side route
// change.
export function Analytics() {
  const pathname = usePathname()
  const pixelReady = useRef(false)

  useEffect(() => {
    onIdle(() => {
      initMetaPixel()
      pixelReady.current = true
      // Fire the PageView for the initial route once the pixel is live.
      pixelTrack('PageView')
    })
  }, [])

  useEffect(() => {
    captureUtm()
    // Skip the very first run (handled above after init); track subsequent
    // client-side navigations.
    if (pixelReady.current) pixelTrack('PageView')
  }, [pathname])

  return null
}
