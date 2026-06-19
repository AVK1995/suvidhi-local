import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  BatteryLow,
  ClipboardCheck,
  FileSearch,
  HelpCircle,
  Pill,
  RotateCw,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, stagger, VIEWPORT_ONCE } from '@/lib/motion'

interface Step {
  icon: LucideIcon
  text: string
}

const cycle: Step[] = [
  { icon: ClipboardCheck, text: "At the six-week checkup, you're told everything looks fine and you're cleared." },
  { icon: BatteryLow, text: "The exhaustion, fog and hair loss continue. You assume it's just part of being a new mum." },
  { icon: Pill, text: 'You add supplements. You research. You try to eat better. You push through.' },
  { icon: Activity, text: "Something shifts slightly, then stalls again. You can't figure out why." },
  { icon: FileSearch, text: 'Months pass. Your labs are still "normal." Your body still doesn\'t feel right.' },
  { icon: HelpCircle, text: 'You quietly start to wonder if this is just who you are now.' },
  { icon: Stethoscope, text: 'You go back to the doctor. Everything still looks fine on paper.' },
  { icon: RotateCw, text: 'The cycle continues. The depletion quietly deepens.' },
]

const consequences = [
  'Ferritin and B12 sitting in the "normal" range while your hair keeps falling out',
  'A metabolism that has quietly shifted into storage mode instead of repair mode',
  'A thyroid that is technically functioning but not converting hormones at the cell level',
  'A cortisol pattern that keeps stealing raw materials away from your recovery hormones',
  'A supplement stack that was never actually reaching your cells to begin with',
  'Growing resignation that this is just what being a mum feels like',
  "Wondering whether you'll ever feel like yourself again, or whether that version of you is gone",
]

export function RecoveryCycle() {
  const railRef = useRef<HTMLDivElement>(null)
  // Timeline fill: the brand line scales from 0 → 1 as the card scrolls through.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 80%', 'end 55%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="You were told recovery takes 6 weeks"
          title={
            <>
              So why are you still{' '}
              <span className="grad-text">waiting months later?</span>
            </>
          }
          subtitle="Most women spend months, sometimes years, cycling through the same pattern. And it is not because they are not trying hard enough."
        />

        {/* sub-label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-10 sm:mt-12 text-center text-[11px] sm:text-[12px] uppercase tracking-[0.18em] font-semibold text-brand-700"
        >
          Most postpartum women don't realise they're caught in this cycle
        </motion.div>

        {/* ── Numbered cycle card with scroll-fill timeline ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-6 mx-auto max-w-3xl rounded-[28px] bg-white border border-ink-100 shadow-elev overflow-hidden"
        >
          <div ref={railRef} className="relative px-5 py-2">
            {/* rail track + scroll-driven fill, centered on the number bullets */}
            <div
              aria-hidden
              className="absolute left-10 top-[42px] bottom-[42px] w-[2px] -translate-x-1/2 bg-ink-100 rounded-full"
            />
            <motion.div
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute left-10 top-[42px] bottom-[42px] w-[2px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-brand-500 to-brand-700"
            />

            <ul>
              {cycle.map((step) => {
                const Icon = step.icon
                return (
                  <li
                    key={step.text}
                    className="relative flex items-center gap-4 py-3.5 border-b border-dashed border-ink-200 last:border-b-0"
                  >
                    <span className="relative z-10 shrink-0 inline-flex w-10 h-10 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft">
                      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                    </span>
                    <span className="font-semibold text-ink-900 text-[14.5px] sm:text-[15.5px] leading-snug text-pretty">
                      {step.text}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </motion.div>

        {/* ── Repeats + "it's not your fault" beat ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-9 flex flex-col items-center text-center"
        >
          <span className="relative inline-flex w-12 h-12 items-center justify-center rounded-full border border-brand-200 text-brand-600 bg-white shadow-soft">
            <span aria-hidden className="pulse-beacon" style={{ animationDuration: '2.8s' }} />
            <RotateCw className="w-5 h-5" strokeWidth={2} />
          </span>
          <p className="mt-4 text-ink-800 text-[16px] font-medium">
            The same pattern repeats, often for a year or more.
          </p>
          <p className="mt-2 text-ink-600 text-[15.5px] leading-relaxed max-w-2xl text-pretty">
            And the gap between{' '}
            <span className="font-semibold text-ink-900">"fine on paper"</span> and{' '}
            <span className="font-semibold text-ink-900">"actually recovered"</span>{' '}
            keeps growing.
          </p>
        </motion.div>

        {/* ── Over time, this can lead to ── */}
        <div className="mt-12 sm:mt-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="flex items-center justify-center gap-3"
          >
            <span aria-hidden className="h-px w-8 sm:w-12 bg-brand-200" />
            <span className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] uppercase tracking-[0.18em] font-semibold text-brand-700">
              <AlertTriangle className="w-4 h-4" />
              Over time, this can lead to
            </span>
            <span aria-hidden className="h-px w-8 sm:w-12 bg-brand-200" />
          </motion.div>

          <motion.ul
            variants={stagger(0.07, 0.07)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="mt-8 mx-auto max-w-3xl space-y-3"
          >
            {consequences.map((c) => (
              <motion.li
                key={c}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-ink-100 shadow-soft flex items-center gap-4 py-4 pl-6 pr-5 transition-all duration-500 hover:shadow-elev hover:border-brand-200"
              >
                {/* red accent (matches reference) */}
                <span aria-hidden className="absolute left-0 inset-y-0 w-1.5 bg-brand-600" />
                <span className="shrink-0 inline-flex w-9 h-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 border border-brand-100">
                  <AlertTriangle className="w-4 h-4" strokeWidth={2} />
                </span>
                <span className="text-ink-800 text-[14.5px] sm:text-[15px] leading-relaxed text-pretty">
                  {c}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ── Manifesto ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 sm:mt-14 mx-auto max-w-xl"
        >
          <div className="relative rounded-2xl surface-tint border border-brand-200/60 px-5 py-5 sm:px-7 sm:py-6 text-center">
            <p className="text-ink-600 text-[13px] sm:text-[13.5px]">
              The problem was never that something was wrong with you.
            </p>
            <p className="mt-2 font-display text-[1.05rem] sm:text-[1.2rem] font-semibold text-ink-950 leading-snug text-balance">
              The problem is that postpartum recovery is a{' '}
              <span className="grad-text">24-month biological project</span>. And no one
              gave you the manual.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
