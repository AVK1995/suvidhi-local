'use client'

import dynamic from 'next/dynamic'
import { RouteFallback } from '@/components/ui/RouteFallback'

// The old React-Router config sent any unmatched path to the landing page
// (`<Route path="*" element={<LandingPage />} />`). Preserve that behaviour.
const LandingPage = dynamic(() => import('@/views/LandingPage'), {
  ssr: false,
  loading: () => <RouteFallback />,
})

export default function NotFound() {
  return <LandingPage />
}
