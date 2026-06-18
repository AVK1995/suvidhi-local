import { motion } from 'framer-motion'
import {
  Battery,
  Brain,
  Heart,
  Moon,
  Smile,
  Sparkles,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, stagger, VIEWPORT_ONCE } from '@/lib/motion'

const items = [
  {
    icon: Brain,
    title: 'Mornings feel clearer',
    desc: 'The brain fog starts to lift. Decisions feel lighter — you stop forgetting what you walked into a room for.',
  },
  {
    icon: Battery,
    title: 'Energy that holds through the day',
    desc: 'The 3 pm crash quietly fades. You stop reaching for that fourth coffee to make it to bedtime.',
  },
  {
    icon: Sparkles,
    title: 'Hair shedding slows down',
    desc: 'You notice fewer strands in the shower. The patches you were trying to ignore start filling back in.',
  },
  {
    icon: Moon,
    title: 'Sleep starts to feel restorative',
    desc: 'Even the broken nights leave you waking less depleted — your nervous system is finally exhaling.',
  },
  {
    icon: Smile,
    title: 'Mood lifts in small, real ways',
    desc: 'You catch yourself laughing more easily. The flat heaviness that sat on you for months starts to lighten.',
  },
  {
    icon: Heart,
    title: 'Confidence around food comes back',
    desc: 'Meals stop feeling like guesswork. You start trusting what your body is asking for — and giving it just that.',
  },
]

export function EarlyResults() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="What mothers notice in the first few weeks"
          title={
            <>
              Real shifts —{' '}
              <span className="grad-text-warm">before anything dramatic</span>
            </>
          }
          subtitle="These aren't transformation promises. They're the quiet, repeatable changes mothers report in their first 2-4 weeks inside The Postpartum Restore."
        />

        <motion.div
          variants={stagger(0.08, 0.07)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {items.map((it) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-3xl bg-white/70 backdrop-blur-md border border-ink-100 shadow-soft p-5 sm:p-6 hover:shadow-elev hover:border-brand-200 transition-all duration-500"
              >
                <span className="icon-tile group-hover:bg-gradient-to-br group-hover:from-brand-100 group-hover:to-brand-200/60 transition-all duration-500">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-950 leading-tight">
                  {it.title}
                </h3>
                <p className="mt-1.5 text-ink-600 text-[14.5px] leading-relaxed text-pretty">
                  {it.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
