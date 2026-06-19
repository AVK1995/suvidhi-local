import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { GradientCTA } from '@/components/ui/GradientCTA'
import { fadeUp, scaleIn, stagger, VIEWPORT_ONCE } from '@/lib/motion'
import { BRAND, OFFER } from '@/lib/config'

export function Guarantee() {
  return (
    <section className="relative section-pad">
      <Container size="narrow">
        <motion.div
          variants={stagger(0.06, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="relative rounded-[28px] sm:rounded-[36px] bg-white border border-ink-100 shadow-elev overflow-hidden p-7 sm:p-10 lg:p-12 text-center flex flex-col items-center"
        >
          {/* soft brand wash */}
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-56 blur-3xl opacity-60 pointer-events-none"
            style={{
              background:
                'radial-gradient(closest-side, rgba(236,158,169,.4), transparent 70%)',
            }}
          />

          <motion.h2 variants={fadeUp} className="relative h-section text-balance">
            <span className="grad-text">14-Day Money-Back</span> Guarantee
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="relative mt-3 text-ink-700 text-[16px] sm:text-lg font-medium"
          >
            Try The Postpartum Restore™ completely risk-free
          </motion.p>

          {/* Refund seal */}
          <motion.div variants={scaleIn} className="relative mt-8 mb-2">
            <RefundSeal />
          </motion.div>

          {/* Body copy */}
          <motion.div
            variants={fadeUp}
            className="relative mt-6 space-y-4 max-w-xl text-ink-700 text-[15.5px] sm:text-[16px] leading-relaxed text-pretty"
          >
            <p>
              <span className="font-semibold text-ink-950">
                Get immediate access to The Postpartum Restore™
              </span>
              , all 4 Recovery Audits, the Postpartum Mothers Community, and your bonus
              resources, and see what insights you uncover about your own recovery.
            </p>
            <p>
              If you genuinely feel The Postpartum Restore wasn't valuable, simply email{' '}
              <a
                href={`mailto:${BRAND.email}`}
                className="font-semibold text-brand-700 underline-offset-2 hover:underline break-all"
              >
                {BRAND.email}
              </a>{' '}
              within 14 days of your purchase and we'll refund your{' '}
              {OFFER.priceLabel} in full.
            </p>
            <p className="font-display text-lg font-semibold text-ink-950">
              No questions asked!
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="relative mt-8 w-full max-w-md">
            <GradientCTA className="w-full" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

function RefundSeal() {
  return (
    <div className="relative w-32 h-32 sm:w-36 sm:h-36 -rotate-[8deg] select-none" aria-label="Full refund guarantee">
      <span aria-hidden className="pulse-beacon" style={{ animationDuration: '3.2s' }} />
      {/* outer ring */}
      <div className="absolute inset-0 rounded-full border-[3px] border-brand-500/70" />
      {/* inner ring */}
      <div className="absolute inset-2.5 rounded-full border border-brand-400/50" />
      {/* center band */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-600">
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold opacity-70">
          14-Day
        </span>
        <span className="my-1 px-3 py-1 rounded-md bg-brand-600 text-white font-display text-base sm:text-lg font-bold tracking-wide shadow-soft -rotate-2">
          FULL REFUND
        </span>
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold opacity-70">
          Guaranteed
        </span>
      </div>
    </div>
  )
}
