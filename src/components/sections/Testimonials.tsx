import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  CheckCircle2,
  Quote,
  Smile,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

interface Metric {
  label: string
  before: string
  after: string
  icon: React.ComponentType<{ className?: string }>
}

interface Testimonial {
  name: string
  age?: number
  postpartum?: string
  initial: string
  gradient: string
  quote: string
  metrics: Metric[]
  duration: string
}

const data: Testimonial[] = [
  {
    name: 'Aisha',
    age: 32,
    postpartum: '14 months postpartum',
    initial: 'A',
    gradient: 'linear-gradient(135deg,#963543,#de6976)',
    quote:
      "Every blood report came back 'normal' but I felt like I was running on fumes. The Postpartum Restore showed me exactly which gaps were still draining me — I started seeing my energy come back within two weeks. I finally feel like myself again.",
    metrics: [
      { label: 'Energy', before: '3/10', after: '8/10', icon: Battery },
      { label: 'Hair Fall', before: 'Heavy', after: 'Slowing', icon: TrendingUp },
      { label: 'Brain Fog', before: 'Daily', after: 'Rare', icon: Sparkles },
    ],
    duration: '8 weeks',
  },
  {
    name: 'Priya',
    age: 29,
    postpartum: '6 months postpartum',
    initial: 'P',
    gradient: 'linear-gradient(135deg,#391218,#CB4A5D)',
    quote:
      "I was told to wait it out — six weeks turned into six months and nothing improved. The audits helped me see exactly where my supplements were falling short and why my hair kept thinning. Within a month, I noticed the shedding slow down.",
    metrics: [
      { label: 'HbA1c equiv', before: 'Pre-diab', after: 'Normal', icon: CheckCircle2 },
      { label: 'Hair Fall', before: 'Severe', after: 'Manageable', icon: TrendingUp },
      { label: 'Mood', before: 'Flat', after: 'Lifting', icon: Smile },
    ],
    duration: '4 weeks',
  },
  {
    name: 'Sneha',
    age: 35,
    postpartum: '18 months postpartum',
    initial: 'S',
    gradient: 'linear-gradient(135deg,#b74706,#ffb01f)',
    quote:
      "My weight wouldn't shift, my mood was flat and I'd written it off as 'just being a mum now'. Suvidhi's framework helped me see this was biology — not personality. Six weeks in, I felt sharper, lighter and more like myself than I had since pregnancy.",
    metrics: [
      { label: 'Weight', before: '+8 kg', after: '-4 kg', icon: TrendingUp },
      { label: 'Energy', before: 'Crashing', after: 'Steady', icon: Battery },
      { label: 'Confidence', before: 'Low', after: 'Back', icon: Sparkles },
    ],
    duration: '6 weeks',
  },
  {
    name: 'Vrinda',
    age: 31,
    postpartum: '10 months postpartum',
    initial: 'V',
    gradient: 'linear-gradient(135deg,#94370c,#f98e07)',
    quote:
      "I had tried three different supplements and a clean diet — none of it stuck. The Postpartum Depletion Audit changed everything. I finally understood what my body was missing and what was actually working. The 1:1 call tied it all together.",
    metrics: [
      { label: 'Sleep', before: 'Broken', after: 'Deep', icon: CheckCircle2 },
      { label: 'Cravings', before: 'Constant', after: 'Gone', icon: TrendingUp },
      { label: 'Mood', before: 'Disconnected', after: 'Present', icon: Smile },
    ],
    duration: '5 weeks',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const next = () => setIndex((i) => (i + 1) % data.length)
  const prev = () => setIndex((i) => (i - 1 + data.length) % data.length)

  useEffect(() => {
    if (paused) return
    const t = window.setInterval(next, 7000)
    return () => window.clearInterval(t)
  }, [paused])

  const active = data[index]

  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="These mothers finally discovered"
          title={
            <>
              What was really{' '}
              <span className="grad-text">holding their recovery back</span>
            </>
          }
          subtitle="A few of the 1000+ high-achieving women who turned postpartum and perimenopause into their strongest chapter — this could be your story too."
        />

        {/* Rating banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-ink-100 shadow-soft">
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
              ))}
            </div>
            <span className="text-sm text-ink-700">
              <span className="font-semibold text-ink-950">4.9/5</span> · based on{' '}
              <span className="font-semibold">1000+</span> mothers
            </span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-10 sm:mt-12 relative"
        >
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -28, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <TestimonialCard t={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls — arrows only, autoplay continues */}
          <div className="mt-7 flex items-center justify-center gap-3">
            <ArrowButton onClick={prev} ariaLabel="Previous testimonial" direction="left" />
            <span className="text-[12.5px] font-medium text-ink-500 tabular-nums">
              <span className="font-semibold text-ink-900">{index + 1}</span> / {data.length}
            </span>
            <ArrowButton onClick={next} ariaLabel="Next testimonial" direction="right" />
          </div>
        </div>
      </Container>
    </section>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative mx-auto max-w-5xl rounded-[32px] overflow-hidden shadow-elev border border-white/60">
      <div aria-hidden className="absolute inset-0 bg-white" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'linear-gradient(135deg, #ffffff 0%, #fdf3f4 60%, #fff7e6 100%)',
        }}
      />
      <div className="relative grid lg:grid-cols-[1.4fr_1fr]">
        {/* Left — Quote */}
        <div className="p-7 sm:p-9 lg:p-10">
          <Quote className="w-9 h-9 text-brand-300" strokeWidth={1.5} />
          <p className="mt-4 font-display text-[1.4rem] sm:text-[1.65rem] lg:text-[1.85rem] leading-[1.35] text-ink-900 text-balance">
            {t.quote}
          </p>

          <div className="mt-7 flex items-center gap-3">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-soft border-2 border-white flex items-center justify-center text-white font-semibold text-lg sm:text-xl"
              style={{ background: t.gradient }}
            >
              {t.initial}
            </div>
            <div>
              <div className="font-semibold text-ink-950">
                {t.name}
                {t.age && <span className="text-ink-500 font-medium"> · {t.age}</span>}
              </div>
              <div className="text-sm text-ink-500 flex items-center gap-1.5 flex-wrap">
                {t.postpartum && <span>{t.postpartum}</span>}
                {t.postpartum && <span className="divider-dot" />}
                <span className="inline-flex items-center gap-1 text-brand-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Metrics */}
        <div className="relative bg-ink-950 text-cream p-7 sm:p-9 lg:p-10 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 0%, rgba(236,158,169,.45) 0%, transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(255,202,74,.18) 0%, transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="text-[11px] uppercase tracking-[0.22em] text-cream/55 font-semibold">
              Recovery · {t.duration}
            </div>
            <div className="mt-5 space-y-5">
              {t.metrics.map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.label}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 text-cream/75 text-sm">
                        <Icon className="w-4 h-4 text-brand-300" />
                        <span>{m.label}</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-2xl text-cream/45 line-through">
                        {m.before}
                      </span>
                      <ArrowRight className="w-4 h-4 text-brand-300 self-center" />
                      <span className="font-display text-3xl sm:text-4xl font-semibold grad-text">
                        {m.after}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrowButton({
  onClick,
  ariaLabel,
  direction,
}: {
  onClick: () => void
  ariaLabel: string
  direction: 'left' | 'right'
}) {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="group relative w-11 h-11 inline-flex items-center justify-center rounded-full
                 bg-white border border-ink-200 text-ink-800 shadow-soft
                 hover:border-brand-500 hover:text-brand-700 hover:-translate-y-0.5 hover:shadow-elev
                 transition-all duration-300"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(60% 80% at 50% 0%, rgba(236,158,169,.4), transparent 70%)',
        }}
      />
      <Icon className="relative w-[18px] h-[18px]" />
    </button>
  )
}
