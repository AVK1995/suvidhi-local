'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureUtm } from '@/lib/utm'
import { initMetaPixel, pixelTrack } from '@/lib/tracking'

// App-wide analytics side-effects, hoisted out of the old React-Router
// <GlobalEffects>. Initialises the Meta Pixel once, then re-captures UTM
// params and fires a PageView on every client-side route change.
export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    initMetaPixel()
  }, [])

  useEffect(() => {
    captureUtm()
    pixelTrack('PageView')
  }, [pathname])

  return null
}
