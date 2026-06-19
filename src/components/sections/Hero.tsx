import { motion } from 'framer-motion'
import { ShieldCheck, Sprout } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Placeholder } from '@/components/ui/Placeholder'
import { GradientCTA } from '@/components/ui/GradientCTA'
import { fadeUp, scaleIn, slideInLeft, slideInRight, stagger } from '@/lib/motion'
import { OFFER } from '@/lib/config'

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Ambient backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-[60vh] blur-3xl opacity-70"
          style={{
            background:
              'radial-gradient(closest-side, rgba(236,158,169,.55), transparent 70%)',
          }}
        />
        <div
          className="absolute top-40 -right-20 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-40"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,202,74,.30), transparent 70%)',
          }}
        />
      </div>

      <Container className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20">
        {/* ── Title block — the three texts ── */}
        <motion.div
          variants={stagger(0.07, 0.08)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="w-full flex justify-center">
            <span className="inline-flex items-start gap-2 rounded-2xl bg-brand-50 border border-brand-200/70 text-brand-700 px-4 py-2.5 sm:px-5 sm:py-3 text-[12px] sm:text-[13px] font-semibold leading-snug text-center max-w-xl">
              <Sprout className="w-4 h-4 shrink-0 mt-0.5 text-brand-600" />
              <span>
                For women 3-24 months postpartum who are still struggling with low
                energy, hair fall, brain fog &amp; a body that doesn't feel like their own
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold leading-[1.08] tracking-tight text-ink-950 mt-6 text-balance text-[2rem] xs:text-[2.2rem] sm:text-[2.7rem] lg:text-[3.4rem]"
          >
            Find Out Exactly Why Your Body{' '}
            <span className="grad-text">Hasn't Fully Recovered After Baby</span>
            <span className="block text-ink-700 font-medium text-lg sm:text-2xl lg:text-[1.9rem] mt-3 sm:mt-4 leading-snug">
              &amp; What To Do About It In Just 25 Minutes
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-ink-700 text-[15.5px] sm:text-[17px] leading-relaxed max-w-2xl mx-auto text-pretty"
          >
            The Postpartum Restore™ is a 25-minute guided assessment that helps you
            identify what's really holding your recovery back, uncover the likely
            reasons why, and connect your symptoms to the recovery gaps most women
            never know to look for.
          </motion.p>
        </motion.div>

        {/* ── Mockup + offer band (same section) ── */}
        <motion.div
          id="offer"
          variants={stagger(0.06, 0.12)}
          initial="hidden"
          animate="show"
          className="mt-10 sm:mt-12 grid lg:grid-cols-2 gap-5 lg:gap-7 items-stretch scroll-mt-6"
        >
          {/* LEFT — dark mockup panel */}
          <motion.div
            variants={slideInLeft}
            className="relative rounded-[28px] overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col min-h-[420px]"
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, #211e1e 0%, #391218 55%, #5d2129 100%)',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  'radial-gradient(50% 50% at 20% 10%, rgba(236,158,169,.25) 0%, transparent 60%)',
              }}
            />

            <div className="relative flex items-start gap-3 mb-4">
              <span
                className="font-script text-brand-200 text-xl sm:text-2xl leading-tight -rotate-3"
                style={{ fontFamily: "'Pacifico', cursive", textShadow: '0 1px 12px rgba(236,158,169,.3)' }}
              >
                The Postpartum
                <br />
                Restore™
              </span>
              <svg
                aria-hidden
                viewBox="0 0 80 60"
                className="w-14 h-12 sm:w-16 sm:h-14 text-brand-200 mt-1 shrink-0"
                fill="none"
              >
                <path d="M6 10 C 40 6, 64 18, 70 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M70 44 L 60 36 M70 44 L 74 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <motion.div variants={scaleIn} className="relative mt-auto">
              <Placeholder
                ratio="aspect-[4/3]"
                rounded="rounded-2xl"
                label="Product collage placeholder"
                className="!border-white/15 !bg-white/[0.04]"
              />
              <SpecialOfferBadge />
            </motion.div>
          </motion.div>

          {/* RIGHT — white offer card */}
          <motion.div
            variants={slideInRight}
            className="relative rounded-[28px] bg-white border border-ink-100 shadow-elev p-6 sm:p-9 lg:p-10 flex flex-col justify-center"
          >
            <div className="text-[12px] uppercase tracking-[0.24em] font-semibold text-ink-500">
              Limited spots
            </div>

            <div className="mt-2 flex items-baseline gap-3 flex-wrap">
              <span className="font-display text-4xl sm:text-5xl font-semibold text-ink-950 leading-none">
                Only
              </span>
              <span className="font-display text-3xl sm:text-4xl font-semibold text-ink-400 line-through leading-none">
                {OFFER.fullPriceLabel}
              </span>
              <span className="font-display text-4xl sm:text-5xl font-semibold text-brand-600 leading-none">
                {OFFER.priceLabel}
              </span>
            </div>

            <p className="mt-3 font-semibold text-ink-900 text-[16px]">
              You're Instantly Saving {OFFER.savingsLabel}
            </p>

            <p className="mt-4 text-ink-700 text-[15.5px] sm:text-[16px] leading-relaxed text-pretty">
              For a limited time, get instant access to The Postpartum Restore, all 4
              Clinical Audits, the Postpartum Mothers Community, Monthly Group Coaching
              Sessions and a 30-Minute Postpartum Assessment Call with Suvidhi (total
              value {OFFER.fullPriceLabel}).
            </p>

            <GradientCTA className="mt-6 w-full" />

            <div className="mt-6 flex items-start gap-4 rounded-2xl surface-tint border border-brand-200/50 p-4">
              <span className="relative shrink-0 w-12 h-12 rounded-full bg-white border border-brand-200 shadow-soft flex items-center justify-center text-brand-700">
                <span aria-hidden className="pulse-beacon" style={{ animationDuration: '3s' }} />
                <ShieldCheck className="w-6 h-6" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <div className="font-display text-[15px] font-semibold text-ink-950">
                  14-Day Money-Back Guarantee
                </div>
                <p className="mt-0.5 text-ink-600 text-[13.5px] leading-relaxed">
                  Go through The Postpartum Restore, complete the assessments, and if
                  you don't feel it was worth every rupee, we'll refund your{' '}
                  {OFFER.priceLabel}. No questions asked.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

function SpecialOfferBadge() {
  return (
    <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 rotate-6">
      <div className="relative rounded-2xl bg-brand-600 text-white shadow-glow px-3.5 py-2 text-center border border-white/20">
        <div className="font-display text-xl sm:text-2xl font-semibold leading-none">
          {OFFER.priceLabel}
        </div>
        <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] font-semibold text-white/80">
          Special offer
        </div>
      </div>
    </div>
  )
}

