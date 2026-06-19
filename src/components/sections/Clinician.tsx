import { motion } from 'framer-motion'
import { Award, Check, GraduationCap, HeartHandshake, Microscope, Sprout } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { Placeholder } from '@/components/ui/Placeholder'
import { fadeUp, slideInLeft, slideInRight, stagger, VIEWPORT_ONCE } from '@/lib/motion'

const pills = [
  { icon: GraduationCap, label: 'UK-trained Clinical Nutritionist' },
  { icon: Sprout, label: 'Postpartum recovery specialist' },
  { icon: Microscope, label: 'Reports · symptoms · lifestyle' },
  { icon: HeartHandshake, label: 'Functional health · real life' },
]

const points = [
  'UK-trained Clinical Nutritionist specialising in postpartum recovery, metabolic health, and helping women feel like themselves again.',
  'Works with women months, even years, postpartum still struggling with exhaustion, hair fall, brain fog, stubborn weight gain and low mood.',
  'Believes being "cleared" after birth and being fully recovered are not the same thing, and built her work around the difference.',
  'Helps mothers connect the dots between symptoms, blood markers and lifestyle patterns so they can stop guessing and decide with confidence.',
  'Combines clinical nutrition, functional health principles and real-world strategy to uncover hidden factors, not just mask symptoms.',
]

export function Clinician() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="The clinician behind The Postpartum Restore"
          title={
            <>
              Meet <span className="grad-text">Suvidhi</span>
            </>
          }
          subtitle="No fad protocols. No one-size-fits-all PDFs. A UK-trained clinician who connects the dots between your reports, symptoms and life, so you can stop guessing."
        />

        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-10 sm:mt-12 lg:mt-14 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Photo placeholder — landscape */}
          <motion.div variants={slideInLeft} className="relative">
            <Placeholder
              ratio="aspect-[4/3]"
              label="Suvidhi · clinician photo"
              rounded="rounded-[24px]"
              className="shadow-elev"
            />
            {/* Floating credential chips */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
              {pills.map((p) => {
                const Icon = p.icon
                return (
                  <span
                    key={p.label}
                    className="flex items-center justify-center text-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-ink-100 shadow-soft text-[12.5px] font-semibold text-ink-800"
                  >
                    <Icon className="w-3.5 h-3.5 text-brand-600" />
                    {p.label}
                  </span>
                )
              })}
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div variants={slideInRight} className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full surface-tint border border-brand-200/60 text-brand-700 text-[12px] font-semibold">
              <Award className="w-3.5 h-3.5" />
              7+ years · 1000+ mothers supported
            </div>
            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-ink-950 leading-tight">
              A real clinician. <span className="grad-text">Your real postpartum.</span>
            </h3>

            <motion.ul
              variants={stagger(0, 0.07)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="mt-6 space-y-3 text-left max-w-xl mx-auto lg:mx-0"
            >
              {points.map((p) => (
                <motion.li key={p} variants={fadeUp} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60 items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-ink-700 text-[15px] leading-relaxed text-pretty">{p}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-7 flex flex-col items-center lg:items-start gap-2.5">
              <PrimaryCTA size="lg" label="Get Instant Access" />
              <p className="text-sm text-ink-600">
                Includes a bonus 1:1 call with Suvidhi
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
