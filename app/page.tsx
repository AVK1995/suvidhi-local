'use client'

import dynamic from 'next/dynamic'
import { RouteFallback } from '@/components/ui/RouteFallback'

// Client-only render mirrors the original SPA (the app reads localStorage,
// cookies and window throughout), so there's no SSR/hydration mismatch.
const LandingPage = dynamic(() => import('@/views/LandingPage'), {
  ssr: false,
  loading: () => <RouteFallback />,
})

export default function Page() {
  return <LandingPage />
}
