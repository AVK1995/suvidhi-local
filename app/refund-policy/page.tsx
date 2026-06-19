'use client'

import dynamic from 'next/dynamic'
import { RouteFallback } from '@/components/ui/RouteFallback'

const RefundPage = dynamic(() => import('@/views/RefundPage'), {
  ssr: false,
  loading: () => <RouteFallback />,
})

export default function Page() {
  return <RefundPage />
}
