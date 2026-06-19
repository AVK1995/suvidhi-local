'use client'

import dynamic from 'next/dynamic'
import { RouteFallback } from '@/components/ui/RouteFallback'

const TermsPage = dynamic(() => import('@/views/TermsPage'), {
  ssr: false,
  loading: () => <RouteFallback />,
})

export default function Page() {
  return <TermsPage />
}
