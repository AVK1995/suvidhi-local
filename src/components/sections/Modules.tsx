import { motion } from 'framer-motion'
import { Check, Gift } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { Placeholder } from '@/components/ui/Placeholder'
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motion'

interface Module {
  title: string
  points: string[]
  deliverable: string
}

// Exact copy from the funnel PDF (right-hand column).
const modules: Module[] = [
  {
    title: 'What Your Six-Week Checkup Never Checked',
    points: [
      'Discover why being "cleared" after birth doesn\'t always mean your body has fully recovered.',
      "Learn why your blood tests can look normal while you're still dealing with exhaustion, hair fall, brain fog and slow recovery.",
      'Complete the Postpartum Depletion Audit and use your latest blood report to identify the first hidden factor that may be holding your recovery back.',
    ],
    deliverable: 'Postpartum Depletion Audit',
  },
  {
    title: 'Why Your Body Is Storing Instead Of Rebuilding',
    points: [
      'Learn why so many postpartum women experience energy crashes, brain fog and constant cravings, even when they\'re eating "healthy."',
      'Discover how the order and balance of your meals can influence your energy, recovery and body composition.',
      'Understand why your body may be storing energy instead of using it to rebuild and recover after pregnancy.',
      'Get The Amino Acid Primer Protocol, including a simple meal framework, food guide and 7-day tracker to help you identify what works best for your body.',
    ],
    deliverable: 'The Amino Acid Primer Protocol',
  },
  {
    title: 'The Missing Nutrients Your Recovery Depends On',
    points: [
      "Discover why your hair may still be shedding months after birth, even if you're taking supplements regularly.",
      'Learn why taking the "right" supplement isn\'t always enough if your body can\'t properly use it.',
      'Understand the hidden connection between nutrient absorption, thyroid function and postpartum hair loss.',
      'Complete the Clinical Supplement Audit and quickly identify which supplements may be helping your recovery and which ones may be falling short.',
    ],
    deliverable: 'Clinical Supplement Audit',
  },
  {
    title: "Why You Still Don't Feel Like Yourself",
    points: [
      'Understand why your mood feels flat even when nothing is technically wrong and why this is biology, not personality.',
      'Learn how ongoing stress, poor sleep and the demands of motherhood can quietly keep your body stuck in survival mode.',
      'Discover the hidden hormone disruptors that may be affecting your recovery and the one simple change worth making first.',
      'Complete the Low-Toxin Home Audit and 14-Day Circadian Reset Tracker to help support better energy, mood and recovery.',
    ],
    deliverable: 'Low-Toxin Home Audit + 14-Day Circadian Reset Tracker',
  },
  {
    title: 'The Strategic Clarity Call',
    points: [
      'Understand why knowing the science is only about 20% of recovery and why knowing how your specific biology responds is the other 80%.',
      "See exactly what personalised, data-driven postpartum restoration looks like and why no two women's protocols are the same.",
      'Complete The High-Performance Readiness Scorecard: a 12-question self-qualifier that takes 3 minutes and tells you honestly whether booking a Strategic Clarity Call is the right next step for you right now.',
    ],
    deliverable: 'The High-Performance Readiness Scorecard',
  },
]

// Sticky-stacking config. Header peek height MUST equal the per-card offset so
// each stacked card reveals exactly its number + title strip beneath the next.
const HEADER_REM = 5.25
const BASE_REM = 1.75

export function Modules() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="Built on 5 clinical modules"
          title={
            <>
              The Postpartum Restore™ is built on{' '}
              <span className="grad-text">5 clinical modules</span>
            </>
          }
          subtitle="You have already been told you are fine. You have already taken the supplements. You have already pushed through. Now see how, in just 25 minutes, The Postpartum Restore helps you pinpoint where your recovery is getting stuck and what your body may need next."
        />

        {/* Stacking cards (all viewports): each pins lower than the last,
            overlapping it and leaving only the module number + title visible,
            up to the 5th card. */}
        <div className="mt-12 sm:mt-16">
          {modules.map((m, i) => (
            <div
              key={m.title}
              className="sticky"
              style={{ top: `calc(${BASE_REM}rem + ${i * HEADER_REM}rem)` }}
            >
              <article className="relative rounded-[24px] border border-ink-100 shadow-elev overflow-hidden bg-white">
                {/* Header peek — number + title (fixed height = stack offset, on
                    every viewport, so the stacking animation runs on mobile too). */}
                <div className="relative flex items-center gap-4 px-5 sm:px-8 text-cream h-[5.25rem]">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(120deg, #391218 0%, #5d2129 45%, #963543 100%)',
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-50"
                    style={{
                      background:
                        'radial-gradient(60% 120% at 0% 0%, rgba(236,158,169,.4) 0%, transparent 60%)',
                    }}
                  />
                  <span className="relative shrink-0 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/12 border border-white/20 font-display text-lg sm:text-xl font-semibold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative min-w-0">
                    <div className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] font-semibold text-brand-200">
                      Module {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display text-[14px] sm:text-xl font-semibold leading-tight line-clamp-2">
                      {m.title}
                    </h3>
                  </div>
                </div>

                {/* Body — revealed only while this card is the top of the stack */}
                <div className="p-5 sm:p-8 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                  <div className="min-w-0">
                    <ul className="space-y-2.5">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60 items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </span>
                          <span className="text-ink-700 text-[14.5px] sm:text-[15px] leading-relaxed text-pretty">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full surface-tint border border-brand-200/50 text-[12.5px] font-semibold text-brand-700">
                      <Gift className="w-3.5 h-3.5" />
                      Includes: {m.deliverable}
                    </div>
                  </div>

                  <Placeholder
                    ratio="aspect-video"
                    label={`Module ${i + 1} visual`}
                    rounded="rounded-[18px]"
                    className="hidden lg:block"
                  />
                </div>
              </article>
            </div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <PrimaryCTA size="lg" label="Get Instant Access" />
          <p className="text-sm text-ink-600">
            All 5 modules · 4 clinical audits · Yours the moment you enrol
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
