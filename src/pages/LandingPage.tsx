import { useEffect } from 'react'
import { TopMarquee } from '@/components/sections/TopMarquee'
import { Hero } from '@/components/sections/Hero'
import { Outcomes } from '@/components/sections/Outcomes'
import { ClarityCall } from '@/components/sections/ClarityCall'
import { Guarantee } from '@/components/sections/Guarantee'
import { Testimonials } from '@/components/sections/Testimonials'
import { EarlyResults } from '@/components/sections/EarlyResults'
import { Clinician } from '@/components/sections/Clinician'
import { TwoChoices } from '@/components/sections/TwoChoices'
import { Qualification } from '@/components/sections/Qualification'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Footer } from '@/components/sections/Footer'
import { StickyCTA } from '@/components/sections/StickyCTA'

export default function LandingPage() {
  useEffect(() => {
    document.title = 'Suvidhi — Control Blood Sugar in 90 Days, Clinically'
  }, [])

  return (
    <div className="relative">
      <TopMarquee />
      <main className="relative">
        <Hero />
        <Outcomes />
        <ClarityCall />
        <Guarantee />
        <Testimonials />
        <EarlyResults />
        <Clinician />
        <TwoChoices />
        <Qualification />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
