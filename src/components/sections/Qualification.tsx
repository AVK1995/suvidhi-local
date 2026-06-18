import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, slideInLeft, slideInRight, stagger, VIEWPORT_ONCE } from '@/lib/motion'
import { OFFER } from '@/lib/config'

const forYou = [
  "You're 3, 6, 12 or even 18 months postpartum and still feel exhausted",
  'Your hair is still shedding more than it should',
  'Your doctor says your reports are "normal", but you don\'t feel normal',
  "You're struggling with brain fog and poor focus",
  'You hit a wall every afternoon and rely on caffeine to get through the day',
  "You've tried supplements, diets and advice online — nothing creates lasting change",
  "The weight came off in some places but the stubborn post-baby pouch hasn't budged",
  'Your mood feels flat, disconnected or unlike the person you used to be',
]

const notForYou = [
  "You're 0-3 months postpartum and still in your early recovery window",
  'You\'re looking for a magic pill or overnight transformation',
  'You\'re unwilling to spend 25 focused minutes on the assessment',
  'You expect personalised 1:1 coaching included for the launch price',
  "You're not open to making any change in food, supplements or sleep",
  `You expect a refund without actually trying the audits for ${OFFER.priceLabel}`,
]

export function Qualification() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="Honest fit check"
          title={
            <>
              Does this <span className="grad-text">sound like you?</span>
            </>
          }
          subtitle="We'd rather you self-select out than waste 25 minutes you don't have. Read both lists honestly — the one on the left is who this is built for."
        />

        <div className="mt-12 sm:mt-14 grid lg:grid-cols-2 gap-5 lg:gap-7">
          {/* FOR YOU */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="relative card p-7 sm:p-8 overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-50"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(236,158,169,.55), transparent 70%)',
              }}
            />
            <div className="relative text-center lg:text-left">
              <div className="chip-success">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-breathe" />
                The Postpartum Restore is for you if
              </div>
              <motion.ul
                variants={stagger(0.1, 0.06)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="mt-6 space-y-3.5 max-w-xs mx-auto lg:max-w-none lg:mx-0 text-left"
              >
                {forYou.map((t) => (
                  <motion.li
                    key={t}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex w-7 h-7 rounded-full bg-brand-100 text-brand-700 border border-brand-200/60 items-center justify-center shrink-0">
                      <Check className="w-4 h-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-ink-800 text-[15px] leading-relaxed">{t}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* NOT FOR YOU */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="relative card p-7 sm:p-8 overflow-hidden border-ink-100"
          >
            <span
              aria-hidden
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-40"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(255,202,74,.4), transparent 70%)',
              }}
            />
            <div className="relative text-center lg:text-left">
              <div className="chip-warm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-breathe" />
                It is NOT for you if
              </div>
              <motion.ul
                variants={stagger(0.1, 0.06)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="mt-6 space-y-3.5 max-w-xs mx-auto lg:max-w-none lg:mx-0 text-left"
              >
                {notForYou.map((t) => (
                  <motion.li
                    key={t}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex w-7 h-7 rounded-full bg-ink-100 text-ink-500 border border-ink-200/60 items-center justify-center shrink-0">
                      <X className="w-4 h-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-ink-700 text-[15px] leading-relaxed">{t}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
