import { motion } from 'framer-motion'
import { HandHeart, RefreshCw, ShieldCheck } from 'lucide-react'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { fadeUp, scaleIn, VIEWPORT_ONCE } from '@/lib/motion'
import { OFFER } from '@/lib/config'

export function Guarantee() {
  return (
    <section className="relative section-pad">
      {/* Tighter horizontal padding on mobile → the promise box runs wider,
          closer to the screen edges, so it reads short-and-wide, not tall. */}
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-7 lg:px-10">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-elev border border-white/60"
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(160deg, #391218 0%, #5d2129 38%, #963543 70%, #7c2d39 100%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(60% 50% at 30% 0%, rgba(236,158,169,.55) 0%, transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(255,202,74,.25) 0%, transparent 60%)',
            }}
          />

          <div className="relative p-5 sm:p-9 lg:p-12 grid lg:grid-cols-[auto_1fr] gap-5 sm:gap-6 lg:gap-12 items-center">
            {/* Seal */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
                <span
                  aria-hidden
                  className="pulse-beacon"
                  style={{ animationDuration: '3s' }}
                />
                <div className="absolute inset-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
                  <div className="absolute inset-3 rounded-full border border-white/15" />
                  <div className="text-center text-cream">
                    <ShieldCheck
                      className="w-8 h-8 sm:w-11 sm:h-11 lg:w-12 lg:h-12 mx-auto text-brand-200"
                      strokeWidth={1.5}
                    />
                    <div className="mt-1 lg:mt-1.5 font-display text-base sm:text-xl lg:text-2xl font-semibold leading-tight">
                      14-Day
                    </div>
                    <div className="text-[9px] sm:text-[10.5px] uppercase tracking-[0.22em] font-semibold text-cream/70">
                      Money-back
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Copy — centered on mobile, left-aligned on desktop */}
            <motion.div
              variants={fadeUp}
              className="text-cream text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <div className="eyebrow !bg-white/10 !text-brand-200 !border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-breathe" />
                The promise
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-[2rem] lg:text-[2.3rem] font-semibold leading-[1.12] text-balance">
                14-Day Money-Back Guarantee —{' '}
                <span className="text-brand-200">Try The Postpartum Restore Risk-Free.</span>
              </h3>
              <p className="mt-3 text-cream/80 text-[15px] sm:text-base leading-relaxed max-w-xl text-pretty">
                Full access to The Postpartum Restore™ — all 4 Recovery Audits,
                the Mothers Community and your bonus resources. If you don't feel
                it was worth every rupee, we'll refund your {OFFER.priceLabel} in
                full. No questions asked.
              </p>

              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                {[
                  { Icon: HandHeart, label: 'No arguments' },
                  { Icon: RefreshCw, label: 'Full refund' },
                  { Icon: ShieldCheck, label: 'No pressure' },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md"
                  >
                    <Icon className="w-3.5 h-3.5 text-brand-200" />
                    <span className="text-[13px] font-medium text-cream">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <PrimaryCTA
                  size="lg"
                  className="!bg-gradient-to-b !from-brand-400 !to-brand-600"
                />
                <p className="text-[13px] text-cream/70 max-w-xs">
                  Low-risk. High clarity. No pressure.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
