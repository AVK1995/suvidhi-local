import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { TopMarquee } from '@/components/sections/TopMarquee'
import { Footer } from '@/components/sections/Footer'

interface PageLayoutProps {
  children: ReactNode
  showMarquee?: boolean
  title?: string
}

export function PageLayout({ children, showMarquee = true, title }: PageLayoutProps) {
  useEffect(() => {
    if (title) document.title = title
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [title])

  return (
    <div className="relative min-h-screen flex flex-col">
      {showMarquee && <TopMarquee />}
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  )
}
