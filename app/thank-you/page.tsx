'use client'

import dynamic from 'next/dynamic'
import { RouteFallback } from '@/components/ui/RouteFallback'

const ThankYouPage = dynamic(() => import('@/views/ThankYouPage'), {
  ssr: false,
  loading: () => <RouteFallback />,
})

export default function Page() {
  return <ThankYouPage />
}
