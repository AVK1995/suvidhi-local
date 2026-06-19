'use client'

import dynamic from 'next/dynamic'
import { RouteFallback } from '@/components/ui/RouteFallback'

const BookACallPage = dynamic(() => import('@/views/BookACallPage'), {
  ssr: false,
  loading: () => <RouteFallback />,
})

export default function Page() {
  return <BookACallPage />
}
