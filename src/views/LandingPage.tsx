import { useEffect } from 'react'
import { Hero } from '@/components/sections/Hero'
import { SoundLikeYou } from '@/components/sections/SoundLikeYou'
import { RecoveryCycle } from '@/components/sections/RecoveryCycle'
import { Modules } from '@/components/sections/Modules'
import { Testimonials } from '@/components/sections/Testimonials'
import { ClarityCall } from '@/components/sections/ClarityCall'
import { ValueStack } from '@/components/sections/ValueStack'
import { Guarantee } from '@/components/sections/Guarantee'
import { Clinician } from '@/components/sections/Clinician'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { StickyCTA } from '@/components/sections/StickyCTA'

export default function LandingPage() {
  useEffect(() => {
    document.title = 'Suvidhi — The Postpartum Restore™ · Find Out Why You Haven\'t Recovered'
  }, [])

  // Layout + section order mirror the TrainerGoesOnline funnel page (per the
  // reference screenshots): hero w/ product mockup → launch-offer box → "does
  // this sound like you" → the cycle + consequences → 5 modules (stacking
  // cards) → testimonials slider → what's included → value-stack recap →
  // guarantee → clinician → FAQ. Pink brand theme + our type hierarchy.
  return (
    <div className="relative">
      <main className="relative">
        <Hero />
        <SoundLikeYou />
        <RecoveryCycle />
        <Modules />
        <Testimonials />
        <ClarityCall />
        <ValueStack />
        <Guarantee />
        <Clinician />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  )
}
