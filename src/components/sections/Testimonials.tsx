import { motion } from 'framer-motion'
import { CheckCircle2, Quote, Star } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Placeholder } from '@/components/ui/Placeholder'
import { fadeUp, stagger, VIEWPORT_ONCE } from '@/lib/motion'

interface Review {
  name: string
  meta: string
  quote: string
}

const reviews: Review[] = [
  {
    name: 'Aisha',
    meta: '32 · 14 months postpartum',
    quote:
      "Every blood report came back 'normal' but I felt like I was running on fumes. The Postpartum Restore showed me exactly which gaps were still draining me. I finally feel like myself again.",
  },
  {
    name: 'Priya',
    meta: '29 · 6 months postpartum',
    quote:
      'I was told to wait it out. The audits helped me see exactly where my supplements were falling short and why my hair kept thinning. Within a month, the shedding slowed down.',
  },
  {
    name: 'Sneha',
    meta: '35 · 18 months postpartum',
    quote:
      "My weight wouldn't shift and my mood was flat. Suvidhi's framework helped me see this was biology, not personality. Six weeks in, I felt sharper, lighter and more like myself.",
  },
  {
    name: 'Vrinda',
    meta: '31 · 10 months postpartum',
    quote:
      'I had tried three supplements and a clean diet. The Depletion Audit changed everything. I finally understood what my body was missing, and the 1:1 call tied it all together.',
  },
]

export function Testimonials() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="These mothers finally discovered"
          title={
            <>
              What was really{' '}
              <span className="grad-text">holding their recovery back</span>
            </>
          }
          subtitle="A few of the 1000+ women who turned postpartum recovery into their strongest chapter. This could be your story too."
        />

        {/* Rating pill */}
        <div className="mt-9 flex justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-ink-100 shadow-soft">
            <span className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
              ))}
            </span>
            <span className="text-sm text-ink-700">
              <span className="font-semibold text-ink-950">4.9/5</span> · based on{' '}
              <span className="font-semibold">1000+</span> mothers
            </span>
          </div>
        </div>

        {/* 2 x 2 grid — equal columns, hover lift, on every viewport */}
        <motion.div
          variants={stagger(0.08, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-10 sm:mt-12 grid md:grid-cols-2 gap-5 sm:gap-6 items-stretch"
        >
          {reviews.map((r) => (
            <motion.figure
              key={r.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-full flex flex-col card border-ink-100 p-5 sm:p-6 transition-all duration-500 hover:shadow-glow hover:border-brand-200"
            >
              <Placeholder
                ratio="aspect-[16/9]"
                label={`${r.name} · before / after`}
                rounded="rounded-2xl"
              />
              <div className="mt-5 flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <Quote className="mt-3 w-7 h-7 text-brand-300" strokeWidth={1.5} />
              <blockquote className="mt-2 text-ink-800 text-[15.5px] leading-relaxed text-pretty flex-1">
                {r.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-ink-950">{r.name}</div>
                  <div className="text-[13px] text-ink-500">{r.meta}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-brand-700 text-[12.5px] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
