import { motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Sprout,
  Stethoscope,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { fadeUp, slideInLeft, slideInRight, stagger, VIEWPORT_ONCE } from '@/lib/motion'
import { ASSETS } from '@/lib/assets'

const credentials = [
  { icon: GraduationCap, label: 'UK-trained Clinical Nutritionist' },
  { icon: Sprout, label: 'Postpartum recovery specialist' },
  { icon: Award, label: '1000+ mothers supported' },
  { icon: Microscope, label: 'Reports · symptoms · lifestyle' },
  { icon: HeartHandshake, label: 'Functional health · real life' },
  { icon: BookOpen, label: '"Cleared" ≠ Recovered' },
]

export function Clinician() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="The clinician behind the Postpartum Restore"
          title={
            <>
              Built on <span className="grad-text">clinical logic</span>, not generic
              recovery advice
            </>
          }
          subtitle="No fad protocols. No one-size-fits-all PDFs. A UK-trained clinician who connects the dots between your reports, symptoms and life — so you can stop guessing."
        />

        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mt-10 sm:mt-12 lg:mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Portrait card — mobile first, desktop left col */}
          <motion.div variants={slideInLeft} className="lg:col-span-5 order-1 lg:order-1">
            <div className="relative max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0 aspect-[4/5]">
              <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-elev border border-white/60">
                {/* Real portrait — anchored to top so face stays in frame */}
                <ResponsiveImage
                  src={ASSETS.clinicianPortrait}
                  alt="Suvidhi — Clinical Nutritionist"
                  loading="lazy"
                  width={480}
                  height={600}
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 420px"
                  objectPosition="center top"
                  className="absolute inset-0 w-full h-full"
                />
                {/* Bottom gradient overlay so the floating credential card stays readable */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(57,18,24,0) 0%, rgba(57,18,24,0.55) 60%, rgba(57,18,24,0.85) 100%)',
                  }}
                />
                {/* Soft top vignette to match brand */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1/4"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(57,18,24,0.35) 0%, transparent 100%)',
                  }}
                />
                {/* Floating credential chips */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/12 border border-white/15 backdrop-blur-md text-white/90"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-brand-200" />
                  <span className="text-[11.5px] font-semibold tracking-tight">
                    UK-trained · MS
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/[0.07] border border-white/15 backdrop-blur-xl p-4 text-white"
                >
                  <div className="font-display text-2xl font-semibold leading-tight">
                    Suvidhi
                  </div>
                  <div className="text-sm text-white/70 mt-0.5">
                    Clinical Nutritionist · Postpartum Recovery Specialist
                  </div>
                </motion.div>
              </div>

              {/* Float chip — Experience.
                  Mobile: anchored to the TOP-right so it sits above Suvidhi's
                  head (the photo crop puts her face higher on small viewports,
                  so anything lower lands on it).
                  sm+: mirrors the Success chip in the lower-right, well below
                  the face — the desktop crop has plenty of room there. */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-2 sm:-right-5 lg:-right-6 top-3 sm:top-auto sm:bottom-48 lg:bottom-52 animate-floaty"
              >
                <div className="rounded-2xl bg-white border border-white/80 shadow-elev px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent-100 text-accent-700 border border-accent-200/60 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] font-semibold text-ink-500">
                      Experience
                    </div>
                    <div className="text-[13px] sm:text-sm font-semibold text-ink-950 leading-tight">
                      7+ Years
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Float chip — Success.
                  Positioned ABOVE the bottom credentials card so they never
                  overlap. The bottom card extends roughly 90px from the bottom
                  edge, so we push this chip to bottom-32 (128px) for clearance. */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-2 sm:-left-5 lg:-left-6 bottom-32 sm:bottom-36 lg:bottom-40 animate-floaty"
                style={{ animationDelay: '1.2s' }}
              >
                <div className="rounded-2xl bg-white border border-white/80 shadow-elev px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-50 text-brand-700 border border-brand-200/60 flex items-center justify-center shrink-0">
                    <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] font-semibold text-ink-500">
                      Success
                    </div>
                    <div className="text-[13px] sm:text-sm font-semibold text-ink-950 leading-tight">
                      100+ Stories
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — copy (mobile: order 2 below image, centered) */}
          <motion.div
            variants={slideInRight}
            className="lg:col-span-7 order-2 lg:order-2 text-center lg:text-left"
          >
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink-950 leading-tight">
              A real clinician. <br className="hidden sm:block" />
              <span className="grad-text">Your real postpartum.</span>{' '}
              <br className="hidden sm:block" />
              A plan that actually fits your life.
            </h3>
            <p className="mt-5 text-ink-700 text-[15.5px] sm:text-[16.5px] leading-relaxed text-pretty max-w-xl mx-auto lg:mx-0">
              I'm Suvidhi — a UK-trained clinical nutritionist who specialises in
              postpartum recovery and metabolic health. I help mothers connect the
              dots between their symptoms, blood markers and lifestyle so you can
              stop guessing — and start making informed decisions about your body.
            </p>

            <motion.ul
              variants={stagger(0, 0.07)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="mt-7 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0"
            >
              {credentials.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.li
                    key={c.label}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-ink-100 shadow-soft hover:border-brand-200 hover:shadow-elev transition-all duration-500 px-3 sm:px-4 py-4 sm:py-5 text-center flex flex-col items-center justify-center gap-2.5"
                  >
                    {/* Soft brand glow on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'radial-gradient(closest-side, rgba(236,158,169,.65), transparent 70%)',
                      }}
                    />
                    {/* Numbered badge */}
                    <span
                      aria-hidden
                      className="absolute top-2 right-2.5 text-[10px] font-mono font-semibold text-ink-300 group-hover:text-brand-400 transition-colors duration-500 tabular-nums"
                    >
                      0{i + 1}
                    </span>
                    {/* Icon in branded circle */}
                    <span className="relative inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200/60 text-brand-700 shadow-soft group-hover:scale-110 group-hover:shadow-ring transition-all duration-500">
                      <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={1.75} />
                    </span>
                    {/* Label */}
                    <span className="relative text-[12.5px] sm:text-[13px] font-semibold text-ink-900 leading-tight text-balance">
                      {c.label}
                    </span>
                  </motion.li>
                )
              })}
            </motion.ul>

            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <PrimaryCTA size="lg" />
              <p className="text-sm text-ink-600">
                One 30-min call ·{' '}
                <span className="font-semibold text-ink-900">No commitment after</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
