import { motion } from 'framer-motion'
import {
  Battery,
  Clock,
  Heart,
  ShieldCheck,
  Sparkles,
  Sprout,
  Stethoscope,
  Users,
  Zap,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Countdown } from '@/components/ui/Countdown'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { fadeUp, scaleIn, stagger } from '@/lib/motion'
import { ASSETS } from '@/lib/assets'
import { OFFER } from '@/lib/config'

const struggles = ['Low Energy', 'Hair Fall', 'Brain Fog', 'A body that doesn\'t feel like your own']

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
          className="absolute top-40 -right-20 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-50"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,202,74,.35), transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-20 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-40"
          style={{
            background:
              'radial-gradient(closest-side, rgba(203,74,93,.30), transparent 70%)',
          }}
        />
      </div>

      <Container className="relative pt-8 pb-10 sm:pt-12 sm:pb-12 lg:pt-20 lg:pb-16">
        {/* Mobile: stacked (title → image → description, centered).
            Desktop: 12-col grid where image lives on the right and spans both
            content rows, so left text reads top-to-bottom as one column. */}
        <motion.div
          variants={stagger(0.05, 0.08)}
          initial="hidden"
          animate="show"
          className="grid gap-8 sm:gap-10 lg:gap-x-12 lg:gap-y-6 lg:grid-cols-12 lg:items-start"
        >
          {/* ─── TITLE BLOCK ─── */}
          <div className="lg:col-span-7 lg:row-start-1 text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              <span className="eyebrow">
                <Sprout className="w-3 h-3" />
                For women 3-24 months postpartum
              </span>
              <span className="chip-warm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-breathe" />
                Special launch pricing
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-ink-700 text-[14.5px] sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              For women still struggling with low energy, hair fall, brain fog and a
              body that doesn't feel like their own.
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display font-semibold leading-[1.08] tracking-tight text-ink-950 mt-5 text-balance text-[1.85rem] xs:text-[2rem] sm:text-[2.4rem] md:text-5xl lg:text-[3.4rem]"
            >
              Find Out Exactly Why Your Body{' '}
              <span className="grad-text">Hasn't Fully Recovered After Baby</span>{' '}
              & What To Do About It{' '}
              <span className="block text-ink-700 font-medium text-lg sm:text-2xl lg:text-[1.85rem] mt-3 sm:mt-4 leading-snug">
                In Just 25 Minutes.
              </span>
            </motion.h1>
          </div>

          {/* ─── HERO VISUAL ─── (mobile order 2, desktop right column) */}
          <motion.div
            variants={scaleIn}
            className="lg:col-span-5 lg:row-start-1 lg:row-span-2 relative"
          >
            <HeroVisual />
          </motion.div>

          {/* ─── DESCRIPTION + STRUGGLES + TRUST + OFFER ─── */}
          <div className="lg:col-span-7 lg:row-start-2 text-center lg:text-left">
            <motion.ul
              variants={fadeUp}
              className="flex flex-row flex-wrap justify-center lg:justify-start items-center gap-x-3 sm:gap-x-5 gap-y-1.5"
            >
              {struggles.map((label) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 text-ink-800 font-medium text-[13px] sm:text-[14.5px] lg:text-[15.5px] whitespace-nowrap"
                >
                  <Heart
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-600 shrink-0"
                    strokeWidth={2}
                  />
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-ink-700 text-[15.5px] sm:text-[16.5px] leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty"
            >
              The Postpartum Restore™ is a 25-minute guided assessment that helps you
              identify what's really holding your recovery back, uncover the likely
              reasons why, and connect your symptoms to the recovery gaps most women
              never know to look for.
            </motion.p>

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              className="mt-6 sm:mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-cream shadow-soft inline-flex items-center justify-center text-[11px] font-semibold text-white"
                      style={{
                        background: [
                          'linear-gradient(135deg,#963543,#de6976)',
                          'linear-gradient(135deg,#b74706,#ffb01f)',
                          'linear-gradient(135deg,#391218,#CB4A5D)',
                          'linear-gradient(135deg,#94370c,#f98e07)',
                        ][i],
                      }}
                    >
                      {['A', 'P', 'S', 'V'][i]}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-ink-700 leading-tight text-left">
                  <div className="font-semibold text-ink-900">1000+ mothers</div>
                  <div className="text-[12.5px] text-ink-600">
                    turned recovery into their strongest chapter
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Offer card — fully centered on mobile, two-column on tablet+ */}
            <motion.div
              variants={fadeUp}
              className="mt-7 sm:mt-8 relative rounded-[24px] sm:rounded-[28px] glass p-5 sm:p-6 max-w-xl mx-auto lg:mx-0 text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-4">
                <div className="flex-1 min-w-0 w-full">
                  <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-700">
                    The Postpartum Restore · 25 min
                  </div>
                  <div className="mt-1.5 flex items-baseline justify-center sm:justify-start gap-2.5 flex-wrap">
                    <span className="font-display text-4xl sm:text-[2.6rem] font-semibold text-ink-950 leading-none">
                      {OFFER.priceLabel}
                    </span>
                    <span className="text-ink-400 line-through font-medium">
                      {OFFER.fullPriceLabel}
                    </span>
                    <span className="chip-warm">{OFFER.discountPctLabel}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-700">
                    You're instantly saving{' '}
                    <span className="font-semibold text-ink-900">
                      {OFFER.savingsLabel}
                    </span>
                  </p>
                </div>
                <div className="shrink-0 self-center sm:self-start w-full sm:w-auto flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2 text-ink-600 mb-2 text-[11px] uppercase tracking-[0.18em] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-accent-600" /> Offer expires in
                  </div>
                  <Countdown minutes={15} />
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3">
                <PrimaryCTA
                  size="lg"
                  label="Get Instant Access"
                  className="flex-1 sm:flex-none"
                />
                <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm text-ink-600">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>
                    <span className="font-semibold text-ink-900">14-Day money-back</span>{' '}
                    guarantee
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-[5/6] max-w-sm sm:max-w-md mx-auto">
      {/* Clinician portrait in a cinematic frame */}
      <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-elev border border-white/60">
        {/* Real photograph — anchored to top so face is never cropped */}
        <ResponsiveImage
          src={ASSETS.heroPortrait}
          alt="Suvidhi — UK-trained Clinical Nutritionist"
          loading="eager"
          fetchPriority="high"
          width={640}
          height={800}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 420px"
          objectPosition="center top"
          className="absolute inset-0 w-full h-full"
        />
        {/* Soft brand-tinted top gradient so the chips stay legible */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/3"
          style={{
            background:
              'linear-gradient(180deg, rgba(57,18,24,0.55) 0%, rgba(57,18,24,0.15) 60%, transparent 100%)',
          }}
        />
        {/* Subtle bottom vignette */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(57,18,24,0.45) 100%)',
          }}
        />

        {/* Header chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between gap-2"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-white/95">
            <Stethoscope className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="text-[10.5px] sm:text-[11.5px] font-semibold tracking-tight whitespace-nowrap">
              Postpartum Restore · 25 min
            </span>
          </div>
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md">
            <span className="relative flex w-1.5 h-1.5 sm:w-2 sm:h-2">
              <span className="absolute inset-0 rounded-full bg-accent-400 animate-ping opacity-75" />
              <span className="relative inline-flex rounded-full w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-400" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 tracking-tight">
              <span className="hidden sm:inline">Instant </span>Access
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating Pills — positioned so they never overlap the top header chip
          or the floating credentials at the corners of the card. */}
      <FloatingPill
        delay={0.7}
        className="-left-1 sm:-left-6 lg:-left-8 top-24 sm:top-28 lg:top-32"
        icon={<Battery className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        title="Energy"
        value="Steady"
        sub="all day long"
        tone="emerald"
      />
      <FloatingPill
        delay={0.9}
        className="-right-1 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2"
        icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        title="Hair Fall"
        value="Slowing"
        sub="month by month"
        tone="emerald"
      />
      <FloatingPill
        delay={1.1}
        className="-left-1 sm:-left-4 lg:-left-6 bottom-6 sm:bottom-10"
        icon={<Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        title="Brain Fog"
        value="Lifting"
        sub="week by week"
        tone="warm"
      />
    </div>
  )
}

function FloatingPill({
  className,
  icon,
  title,
  value,
  sub,
  delay = 0,
  tone = 'emerald',
}: {
  className?: string
  icon: React.ReactNode
  title: string
  value: string
  sub?: string
  delay?: number
  tone?: 'emerald' | 'warm'
}) {
  const iconCls =
    tone === 'warm'
      ? 'text-accent-700 bg-accent-100 border-accent-200/60'
      : 'text-brand-700 bg-brand-50 border-brand-200/60'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-10 ${className}`}
    >
      <div className="animate-floaty rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-elev px-2.5 sm:px-3.5 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-2.5">
        <span
          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center ${iconCls}`}
        >
          {icon}
        </span>
        <div className="leading-tight">
          <div className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold text-ink-500">
            {title}
          </div>
          <div className="text-[12.5px] sm:text-sm font-semibold text-ink-950">
            {value}
          </div>
          {sub && (
            <div className="text-[10.5px] sm:text-[11px] text-ink-500">{sub}</div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
