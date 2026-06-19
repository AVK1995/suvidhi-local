import { motion } from 'framer-motion'
import {
  Battery,
  Brain,
  Coffee,
  FileSearch,
  Frown,
  Scissors,
  Sparkles,
  Waves,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { fadeUp, stagger, VIEWPORT_ONCE } from '@/lib/motion'

const signs = [
  {
    icon: Battery,
    text: "You're 3, 6, 12 or even 24 months postpartum and still feel exhausted.",
  },
  { icon: Scissors, text: 'Your hair is still shedding more than it should.' },
  {
    icon: FileSearch,
    text: 'Your doctor says your reports are "normal", but you don\'t feel normal.',
  },
  { icon: Brain, text: "You're struggling with brain fog and poor focus." },
  {
    icon: Coffee,
    text: 'You hit a wall every afternoon and rely on caffeine to get through the day.',
  },
  {
    icon: Waves,
    text: "You've tried supplements, diets and advice online, but nothing seems to create lasting change.",
  },
  {
    icon: Sparkles,
    text: "The weight came off in some places but the stubborn post-baby pouch hasn't budged.",
  },
  {
    icon: Frown,
    text: 'Your mood feels flat, disconnected or unlike the person you used to be.',
  },
]

export function SoundLikeYou() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="An honest gut-check"
          title={
            <>
              Does this <span className="grad-text">sound like you?</span>
            </>
          }
          subtitle="If you nod along to even a few of these, you're not imagining it, and you're not alone. This is exactly the pattern The Postpartum Restore was built to decode."
        />

        <motion.ul
          variants={stagger(0.06, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 sm:mt-14 grid sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {signs.map((s) => {
            const Icon = s.icon
            return (
              <motion.li
                key={s.text}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-start gap-4 rounded-2xl bg-white border border-ink-100 shadow-soft p-5 sm:p-6 hover:border-brand-200 hover:shadow-elev transition-all duration-500"
              >
                <span className="icon-tile shrink-0 group-hover:scale-110 group-hover:shadow-ring transition-all duration-500">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <p className="text-ink-800 text-[15px] sm:text-[15.5px] leading-relaxed text-pretty pt-1">
                  {s.text}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <PrimaryCTA size="lg" label="Get Instant Access" />
          <p className="text-sm text-ink-600">
            14-Day money-back guarantee · Instant access
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
