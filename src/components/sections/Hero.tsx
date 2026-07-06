import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, Clock, ArrowDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import Image from 'next/image'
import { GradientCTA } from '@/components/ui/GradientCTA'
import {
  fadeUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  stagger,
  CTA_ATTENTION_ANIMATE,
  CTA_ATTENTION_TRANSITION,
} from '@/lib/motion'
import { OFFER } from '@/lib/config'

const PAIN_POINTS = [
  'Low Energy',
  'Hair Fall',
  'Brain Fog',
  'Postpartum Belly',
  'Mood Swings',
]

const INCLUDED = [
  'The Postpartum Restore™ — 25-min guided assessment',
  'All 4 Clinical Audits',
  'Private Postpartum Mothers Community',
  'Monthly Group Coaching Sessions',
  '30-Min Assessment Call with Suvidhi',
  'UK-trained Clinical Nutritionist',
  'Postpartum Recovery Specialist',
]

export function Hero() {
  const reduce = useReducedMotion()
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

      <Container className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-8 lg:pb-16">
        {/* ── Title block ── */}
        <motion.div
          variants={stagger(0.07, 0.06)}
          initial={false}
          animate="show"
          className="mx-auto max-w-4xl text-center flex flex-col items-center"
        >
          {/* Eyebrow — live dot only */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 px-3.5 py-2 sm:px-4 text-[12px] sm:text-[13px] font-semibold leading-snug"
          >
            <span className="relative flex w-2 h-2 shrink-0">
              <span className="absolute inline-flex w-full h-full rounded-full bg-brand-400 opacity-70 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-600" />
            </span>
            For Women 3–24 Months Postpartum Who Still Don&apos;t Feel Fully
            Recovered
          </motion.span>

          {/* Pain-point pills */}
          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-2.5"
          >
            {PAIN_POINTS.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white border border-ink-100 shadow-soft px-3.5 py-1.5 sm:px-4 sm:py-2 text-[13px] sm:text-[14.5px] font-semibold text-ink-800"
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-brand-400 opacity-70 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-600" />
                </span>
                {p}
              </span>
            ))}
          </motion.div>

          {/* Title — single headline, two highlighted phrases */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-semibold leading-[1.14] tracking-tight text-ink-950 mt-5 text-[1.8rem] xs:text-[2.05rem] sm:text-[2.45rem] lg:text-[2.95rem] text-balance"
          >
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap align-baseline">
              <span className="grad-text-warm">In Just 25 Mins</span>
              <Clock className="w-[0.8em] h-[0.8em] text-accent-500" strokeWidth={2.25} />
            </span>
            , Find Out Exactly What&apos;s Holding Your{' '}
            <span className="grad-text">Postpartum Recovery Back</span>{' '}
            &amp; What To Do About It
          </motion.h1>

          {/* Subtext — slightly smaller */}
          <motion.p
            variants={fadeUp}
            className="mt-4 text-ink-600 text-[13.5px] sm:text-[15px] leading-relaxed max-w-2xl mx-auto text-pretty"
          >
            The Postpartum Restore™ is a 25-minute guided assessment that helps
            you uncover what&apos;s really holding your recovery back, and know
            exactly <span className="font-semibold text-ink-800">where to focus first</span>.
          </motion.p>

          {/* Mobile-only quick CTA — jumps down to the offer card that sits
              below the mockup. Hidden on lg, where the offer card is already
              visible side-by-side with the mockup. Native anchor + the global
              `scroll-behavior: smooth` (index.css) gives the smooth scroll.
              Continuous wobble + shine sweep draw the eye (respect reduced
              motion). Compact size so it reads as a secondary jump-link. */}
          <motion.a
            href="#offer-card"
            initial={false}
            animate={reduce ? undefined : CTA_ATTENTION_ANIMATE}
            transition={reduce ? undefined : CTA_ATTENTION_TRANSITION}
            whileTap={{ scale: 0.96 }}
            className="group relative mt-6 inline-flex w-full max-w-[15.5rem] items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 font-display text-[15px] font-semibold tracking-tight text-white shadow-elev transition-shadow duration-500 hover:shadow-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30 lg:hidden"
            style={{ background: 'linear-gradient(90deg, #de6976 0%, #CB4A5D 50%, #963543 100%)' }}
          >
            {/* Shine — sweeps left→right on a loop */}
            <motion.span
              aria-hidden
              initial={{ x: '-160%' }}
              animate={reduce ? undefined : { x: ['-160%', '260%'] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 1.15, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.7 }
              }
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-12deg]"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.5) 50%, transparent 100%)',
              }}
            />
            <span className="relative inline-flex items-center gap-2">
              Get Instant Access
              <motion.span
                aria-hidden
                animate={reduce ? undefined : { y: [0, 3, 0] }}
                transition={
                  reduce ? undefined : { duration: 1.1, ease: 'easeInOut', repeat: Infinity }
                }
              >
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </motion.span>
            </span>
          </motion.a>
        </motion.div>

        {/* ── Mockup + offer band ── */}
        <motion.div
          id="offer"
          variants={stagger(0.06, 0.12)}
          initial={false}
          animate="show"
          className="mt-9 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 items-stretch scroll-mt-6"
        >
          {/* LEFT — dark mockup panel */}
          <motion.div
            variants={slideInLeft}
            className="relative rounded-[28px] overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col min-h-[360px] sm:min-h-[420px]"
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

            <div className="relative flex items-start gap-3 mb-5 sm:mb-6">
              <span
                className="font-script text-brand-200 text-[1.7rem] sm:text-4xl lg:text-[2.75rem] leading-tight -rotate-3"
                style={{ textShadow: '0 1px 12px rgba(236,158,169,.3)' }}
              >
                The Postpartum
                <br />
                Restore™
              </span>
              <svg
                aria-hidden
                viewBox="0 0 80 60"
                className="w-20 h-16 sm:w-24 sm:h-20 lg:w-28 lg:h-24 text-brand-200 mt-2 shrink-0"
                fill="none"
              >
                <path d="M6 10 C 40 6, 64 18, 70 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M70 44 L 60 36 M70 44 L 74 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <motion.div variants={scaleIn} className="relative mt-auto">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/15">
                <Image
                  src="/Hero-Section-Collage/Hero_Collage.png"
                  alt="Suvidhi with The Postpartum Restore — the assessment, 4 clinical audits and 3 bonuses"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <SpecialOfferBadge />
            </motion.div>
          </motion.div>

          {/* RIGHT — white offer card. `id` is the scroll target for the
              mobile "Get Instant Access ↓" CTA above the mockup; scroll-mt keeps
              the "Limited spots" badge clear of the sticky marquee on landing. */}
          <motion.div
            id="offer-card"
            variants={slideInRight}
            className="relative scroll-mt-24 rounded-[28px] bg-white border border-ink-100 shadow-elev p-6 sm:p-9 lg:p-10 flex flex-col justify-center"
          >
            {/* Limited spots — eye-catchy badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-50 border border-brand-200/70 px-3 py-1.5 text-[10.5px] sm:text-[11px] uppercase tracking-[0.18em] font-bold text-brand-700">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-brand-500 opacity-70 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-brand-600" />
              </span>
              Limited spots this week
            </div>

            <div className="mt-3 flex items-baseline gap-2.5 flex-wrap">
              <span className="font-display text-3xl sm:text-5xl font-semibold text-ink-950 leading-none">
                Only
              </span>
              <span className="font-display text-2xl sm:text-4xl font-semibold text-ink-400 line-through leading-none">
                {OFFER.fullPriceLabel}
              </span>
              <span className="font-display text-3xl sm:text-5xl font-semibold text-brand-600 leading-none">
                {OFFER.priceLabel}
              </span>
            </div>

            <p className="mt-2.5 font-semibold text-ink-900 text-[15px] sm:text-[16px]">
              You&apos;re Instantly Saving {OFFER.savingsLabel}
            </p>

            {/* Included — pointers */}
            <ul className="mt-4 space-y-2">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-ink-700 text-[13.5px] sm:text-[14.5px] leading-snug"
                >
                  <CheckCircle2
                    className="w-[18px] h-[18px] shrink-0 text-brand-600 mt-0.5"
                    strokeWidth={2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2.5 text-[12.5px] font-semibold text-ink-500">
              Total value {OFFER.fullPriceLabel}
            </p>

            <GradientCTA className="mt-5 w-full" />

            {/* Guarantee — trimmed */}
            <div className="mt-5 flex items-center gap-3.5 rounded-2xl surface-tint border border-brand-200/50 p-3.5 sm:p-4">
              <span className="relative shrink-0 w-11 h-11 rounded-full bg-white border border-brand-200 shadow-soft flex items-center justify-center text-brand-700">
                <span aria-hidden className="pulse-beacon" style={{ animationDuration: '3s' }} />
                <ShieldCheck className="w-[22px] h-[22px]" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <div className="font-display text-[14.5px] font-semibold text-ink-950">
                  14-Day Money-Back Guarantee
                </div>
                <p className="mt-0.5 text-ink-600 text-[13px] leading-snug">
                  Not worth it? We&apos;ll refund your {OFFER.priceLabel} — no
                  questions asked.
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
