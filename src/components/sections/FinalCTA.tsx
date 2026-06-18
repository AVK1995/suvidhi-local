import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Clock,
  Lock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { Countdown } from '@/components/ui/Countdown'
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motion'
import { OFFER } from '@/lib/config'

const inclusions = [
  'The 25-min Postpartum Restore assessment',
  'All four Clinical Recovery Audits',
  'Private mothers community + monthly coaching',
  'Bonus 30-min 1:1 Assessment Call with Suvidhi',
]

export function FinalCTA() {
  return (
    <section id="book-call" className="relative section-pad scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="25 min · Clinical clarity · Risk-free"
          title={
            <>
              You don't need another guess.{' '}
              <span className="grad-text">You need a clinician.</span>
            </>
          }
          subtitle="One short checkout, one big shift. Take a single focused step today — and start understanding your body instead of pushing through it."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 sm:mt-14 mx-auto max-w-4xl"
        >
          <div className="relative rounded-[32px] overflow-hidden shadow-elev border border-white/60">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, #391218 0%, #5d2129 38%, #963543 100%)',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  'radial-gradient(60% 50% at 30% 0%, rgba(236,158,169,.5) 0%, transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(255,202,74,.2) 0%, transparent 60%)',
              }}
            />
            <div className="relative p-7 sm:p-9 lg:p-11 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10 items-center text-cream text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] uppercase tracking-[0.22em] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-brand-200" />
                  The Postpartum Restore · 25 min
                </div>
                <h3 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[2.4rem] font-semibold leading-tight">
                  {OFFER.priceLabel}{' '}
                  <span className="text-cream/50 text-xl font-medium line-through">
                    {OFFER.fullPriceLabel}
                  </span>
                </h3>
                <p className="mt-3 text-cream/80 leading-relaxed text-[15.5px] max-w-md">
                  A 25-minute guided assessment by a UK-trained clinical nutritionist.
                  Plus four clinical audits, the community, monthly coaching and a
                  bonus 1:1 with Suvidhi.
                </p>

                <div className="mt-6 space-y-3 text-left">
                  {inclusions.map((t) => (
                    <div key={t} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-200 mt-1 shrink-0" />
                      <span className="text-cream/90 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5 w-full">
                <div className="rounded-2xl bg-white/8 border border-white/12 backdrop-blur-md p-5 flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-cream/65 mb-3">
                    <Clock className="w-3.5 h-3.5 text-accent-300" /> Offer ends in
                  </div>
                  <Countdown minutes={15} variant="dark" />
                </div>

                <PrimaryCTA
                  size="lg"
                  label="Proceed to checkout"
                  className="w-full !bg-white !text-brand-700 hover:!bg-cream-dark hover:!text-brand-800"
                  showPrice={false}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/8 border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-brand-200" />
                    <span className="text-[12.5px] font-medium text-cream">
                      Money-back
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/8 border border-white/10">
                    <Lock className="w-4 h-4 text-brand-200" />
                    <span className="text-[12.5px] font-medium text-cream">
                      100% secure
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
