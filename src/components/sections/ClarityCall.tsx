import { motion } from 'framer-motion'
import {
  Activity,
  Beaker,
  Brain,
  Calculator,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Gift,
  MessageSquareHeart,
  Pill,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { fadeUp, stagger, VIEWPORT_ONCE } from '@/lib/motion'
import { OFFER } from '@/lib/config'

const coreItems = [
  {
    icon: ClipboardCheck,
    title: 'The Postpartum Restore™ Guided Assessment',
    value: '₹5,000',
    desc: 'A 25-minute guided recovery experience that helps you identify what is really holding your recovery back, connect the dots between symptoms, and uncover the specific factors affecting your energy, hair, mood and recovery.',
  },
  {
    icon: Activity,
    title: 'The Postpartum Depletion Audit',
    value: '₹1,500',
    desc: 'Review your blood markers against postpartum-focused ranges and discover whether hidden nutrient deficiencies are contributing to fatigue, hair loss, brain fog and slow recovery.',
  },
  {
    icon: Beaker,
    title: 'The Metabolic Recovery Audit',
    value: '₹1,500',
    desc: 'Identify the eating patterns, energy crashes and recovery gaps that may be keeping your body stuck in storage mode instead of repair mode.',
  },
  {
    icon: Pill,
    title: 'The Supplement & Hair Recovery Audit',
    value: '₹1,500',
    desc: 'Discover whether your current supplements are actually supporting your recovery and uncover the hidden connections between nutrient status, thyroid health and postpartum hair loss.',
  },
  {
    icon: Brain,
    title: 'The Neuro-Endocrine Reset Audit',
    value: '₹1,500',
    desc: 'Evaluate the lifestyle, stress and environmental factors that may be quietly affecting your hormones, energy, mood and overall recovery.',
  },
]

const bonusItems = [
  {
    icon: MessageSquareHeart,
    title: '30-Minute Postpartum Assessment Call with Suvidhi',
    value: '₹2,500',
    desc: 'Get personalised guidance on your assessment results, clarity on your biggest recovery bottlenecks, and expert direction on the next best steps for your body.',
  },
  {
    icon: Users,
    title: 'Private Postpartum Mothers Community',
    value: '₹3,000',
    desc: 'A supportive community of mothers navigating similar challenges, sharing wins, asking questions and supporting one another through recovery.',
  },
  {
    icon: Calendar,
    title: 'Monthly Group Coaching Sessions',
    value: '₹4,500',
    desc: 'Live coaching sessions with Suvidhi — ongoing education, answers to your questions and deeper support as you keep implementing your plan.',
  },
]

export function ClarityCall() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="Here's everything you'll get inside"
          title={
            <>
              <span className="grad-text">The Postpartum Restore</span>
            </>
          }
          subtitle="Five clinical components plus three free bonuses — each one designed to move you out of survival mode and into actual recovery."
        />

        <motion.div
          variants={stagger(0.08, 0.07)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 sm:mt-14 grid md:grid-cols-2 gap-4 sm:gap-5"
        >
          {coreItems.map((it) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative card card-hover p-6 sm:p-7 overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(closest-side, rgba(236,158,169,.55), transparent 70%)',
                  }}
                />
                <div className="relative flex items-start gap-4">
                  <span className="icon-tile-lg group-hover:scale-110 group-hover:shadow-ring transition-all duration-500">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                      <h3 className="h-sub text-lg sm:text-xl text-ink-950 leading-tight">
                        {it.title}
                      </h3>
                      <span className="chip-success shrink-0">{it.value} value</span>
                    </div>
                    <p className="text-ink-600 text-[15px] leading-relaxed text-pretty">
                      {it.desc}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-semibold text-brand-700">
                      <CheckCircle2 className="w-4 h-4" />
                      Instant access · Included
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bonus divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-10 sm:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-200/60 text-accent-700 text-[11px] uppercase tracking-[0.22em] font-semibold">
            <Gift className="w-3.5 h-3.5" />
            Plus these bonuses · included free
          </div>
        </motion.div>

        <motion.div
          variants={stagger(0.08, 0.07)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-8 sm:mt-10 grid md:grid-cols-3 gap-4 sm:gap-5"
        >
          {bonusItems.map((it) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative card card-hover p-5 sm:p-6 overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(closest-side, rgba(255,202,74,.5), transparent 70%)',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="icon-tile w-11 h-11 rounded-xl">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <span className="chip-warm">{it.value} value</span>
                  </div>
                  <h3 className="font-display text-[1.05rem] sm:text-[1.15rem] font-semibold text-ink-950 leading-tight">
                    {it.title}
                  </h3>
                  <p className="mt-1.5 text-ink-600 text-[14px] leading-relaxed">
                    {it.desc}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-accent-700 uppercase tracking-[0.16em]">
                    <Sparkles className="w-3 h-3" />
                    Bonus · included
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Total value summary */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-10 sm:mt-12 mx-auto max-w-3xl"
        >
          <div className="relative rounded-[28px] overflow-hidden border border-brand-200/60 shadow-elev bg-white">
            <div
              aria-hidden
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  'linear-gradient(135deg, #fdf3f4 0%, #ffffff 40%, #fff7e6 100%)',
              }}
            />
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-brand-700 mb-2">
                  <Calculator className="w-3.5 h-3.5" />
                  Total real value
                </div>
                <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-3">
                  <span className="font-display text-5xl sm:text-6xl font-semibold text-ink-950 leading-none">
                    {OFFER.fullPriceLabel}
                  </span>
                  <span className="text-ink-500 text-lg">→</span>
                  <span className="font-display text-4xl sm:text-5xl font-semibold leading-none grad-text">
                    {OFFER.priceLabel}
                  </span>
                </div>
                <p className="mt-3 text-ink-700 max-w-md mx-auto sm:mx-0 text-pretty">
                  Get everything today for{' '}
                  <span className="font-semibold text-ink-900">
                    {OFFER.priceLabel} (one-time)
                  </span>{' '}
                  · You save{' '}
                  <span className="font-semibold text-ink-900">
                    {OFFER.savingsLabel}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-stretch sm:items-end gap-3 w-full sm:w-auto">
                <PrimaryCTA size="lg" />
                <div className="inline-flex items-center justify-center sm:justify-end gap-2 text-sm text-ink-600">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>14-Day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
