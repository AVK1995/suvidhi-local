import { motion } from 'framer-motion'
import {
  Battery,
  HeartHandshake,
  Microscope,
  Search,
  Sprout,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, stagger, VIEWPORT_ONCE } from '@/lib/motion'

const outcomes = [
  {
    icon: Search,
    title: 'Why being "cleared" at six weeks doesn\'t mean fully recovered',
    desc: 'The gap between "normal on paper" and actually feeling like yourself — and where yours is hiding.',
  },
  {
    icon: Battery,
    title: 'Why your body may be storing energy instead of rebuilding',
    desc: 'How meal order, balance and timing decide whether you crash at 3 pm — or run steady all day.',
  },
  {
    icon: Microscope,
    title: 'The nutrient gaps your recovery actually depends on',
    desc: 'Why the "right" supplements often fall short, and the hidden absorption issues that quietly stall hair, mood and energy.',
  },
  {
    icon: HeartHandshake,
    title: "Why you still don't feel like yourself — and that it's biology, not personality",
    desc: 'The stress, sleep and hormone patterns that keep your body stuck in survival mode long after delivery.',
  },
  {
    icon: Sprout,
    title: 'What truly personalised, data-driven postpartum recovery looks like',
    desc: 'A clear sense of what 80% of your recovery depends on — and a yes-or-no on whether a deeper plan is your next step.',
  },
]

export function Outcomes() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="In just 25 minutes"
          title={
            <>
              5 things you'll discover{' '}
              <span className="grad-text">inside the Postpartum Restore</span>
            </>
          }
          subtitle="A guided 25-minute assessment that helps you pinpoint where your recovery is getting stuck — and exactly what your body may need next."
        />

        <motion.ol
          variants={stagger(0.1, 0.07)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-12 sm:mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {outcomes.map((o, i) => {
            const Icon = o.icon
            return (
              <motion.li
                key={o.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative card card-hover p-6 overflow-hidden"
              >
                <div className="absolute top-5 right-5 font-display text-4xl text-ink-100 group-hover:text-brand-100 transition-colors duration-500">
                  0{i + 1}
                </div>
                <span className="icon-tile-lg group-hover:scale-110 group-hover:shadow-ring transition-all duration-500">
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-950 leading-tight text-balance">
                  {o.title}
                </h3>
                <p className="mt-2 text-ink-600 text-[15px] leading-relaxed text-pretty">
                  {o.desc}
                </p>
              </motion.li>
            )
          })}
          {/* Decorative card */}
          <motion.li
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden shadow-elev md:col-span-2 lg:col-span-1"
          >
            <div className="absolute inset-0 glass-dark" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  'radial-gradient(60% 50% at 30% 0%, rgba(236,158,169,.4) 0%, transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(255,202,74,.18) 0%, transparent 60%)',
              }}
            />
            <div className="relative p-6 sm:p-7 h-full flex flex-col text-cream">
              <div className="icon-tile-dark w-14 h-14 rounded-[1.25rem]">
                <Sprout className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <p className="mt-5 font-display text-xl font-semibold leading-tight">
                Not another generic diet chart.
              </p>
              <p className="mt-2 text-cream/75 text-[15px] leading-relaxed">
                You leave with a written summary, a clear next step, and four
                clinical audits that are yours to keep — whatever you decide to do
                next.
              </p>
              <div className="mt-auto pt-6 text-xs uppercase tracking-[0.22em] text-brand-200 font-semibold">
                25 minutes · Yours forever · No pressure
              </div>
            </div>
          </motion.li>
        </motion.ol>
      </Container>
    </section>
  )
}
