import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, slideInLeft, slideInRight, VIEWPORT_ONCE } from '@/lib/motion'
import { OFFER } from '@/lib/config'

const losing = [
  'Told "everything looks normal" at your six-week checkup',
  'Months later, still exhausted with hair fall and brain fog',
  'Adding supplements, researching, pushing through — nothing sticks',
  'Labs come back "fine" while your body still doesn\'t feel right',
  'Quietly wondering if this is just who you are now',
  'The same cycle repeats. The depletion quietly deepens.',
]

const winning = [
  'Identify the exact gaps your six-week check never looked at',
  '25 focused minutes inside a guided clinical assessment',
  'Four audits that map your symptoms to real recovery factors',
  'A bonus 1:1 with Suvidhi to make sense of what you found',
  'Stop guessing — start making informed decisions about your body',
  'Energy, hair, mood and confidence quietly coming back',
]

export function TwoChoices() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="Two paths from here"
          title={
            <>
              You were told recovery takes 6 weeks.{' '}
              <span className="grad-text">So why are you still waiting?</span>
            </>
          }
          subtitle="One path leads to another year of cycling through the same pattern. The other breaks it — in 25 minutes."
        />

        <div className="mt-12 sm:mt-14 grid lg:grid-cols-2 gap-5 lg:gap-7 items-stretch">
          {/* LOSING PATH */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="relative card p-7 sm:p-8 flex flex-col text-center lg:text-left items-center lg:items-stretch"
          >
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-ink-500">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-400" />
              Option 1
            </div>
            <h3 className="mt-3 font-display text-2xl sm:text-[1.7rem] font-semibold text-ink-950 leading-tight">
              Stay caught in the cycle
            </h3>
            <p className="mt-2 text-ink-600 text-[15px]">
              The cycle most postpartum women don't realise they're in.
            </p>

            <ul className="mt-7 space-y-3 flex-1 max-w-xs mx-auto lg:max-w-none lg:mx-0 text-left w-full">
              {losing.map((l) => (
                <li key={l} className="flex items-start gap-3 text-ink-700">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-ink-100 text-ink-500 items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] leading-relaxed">{l}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-ink-500 uppercase tracking-[0.18em]">
              Outcome · Same place, three months from now
            </div>
          </motion.div>

          {/* WINNING PATH */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="relative rounded-3xl p-7 sm:p-8 flex flex-col shadow-elev border border-brand-200/60 overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, #391218 0%, #5d2129 50%, #963543 100%)',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  'radial-gradient(60% 50% at 50% 0%, rgba(236,158,169,.5) 0%, transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(255,202,74,.18) 0%, transparent 60%)',
              }}
            />
            <div className="relative flex flex-col h-full text-center lg:text-left items-center lg:items-stretch">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-cream/90 text-[11px] uppercase tracking-[0.22em] font-semibold self-center lg:self-start">
                <Sparkles className="w-3 h-3" /> Option 2 · Recommended
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-[1.7rem] font-semibold text-cream leading-tight">
                Break the cycle in 25 minutes
              </h3>
              <p className="mt-2 text-cream/75 text-[15px]">
                One guided assessment. Real answers. A clear next step today.
              </p>

              <ul className="mt-7 space-y-3 flex-1 max-w-xs mx-auto lg:max-w-none lg:mx-0 text-left w-full">
                {winning.map((l) => (
                  <li key={l} className="flex items-start gap-3 text-cream/90">
                    <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-brand-300/15 text-brand-200 border border-brand-300/20 items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[15px] leading-relaxed">{l}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-200 uppercase tracking-[0.18em]">
                Outcome · Clear path, real progress <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-10 text-center text-ink-600 max-w-xl mx-auto text-[15px]"
        >
          The cost of choosing option 1 is paid in months. The cost of choosing option
          2 is {OFFER.priceLabel}.
        </motion.div>
      </Container>
    </section>
  )
}
