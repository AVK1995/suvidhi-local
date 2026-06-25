import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getFunnelState, setFunnelState } from '@/lib/funnelState'
import {
  ArrowDown,
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Compass,
  Eye,
  Gift,
  Heart,
  Lightbulb,
  ListChecks,
  MessageSquareHeart,
  Sparkles,
  Target,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TopMarquee } from '@/components/sections/TopMarquee'
import { Footer } from '@/components/sections/Footer'
import { BookACallStickyCTA } from '@/components/sections/BookACallStickyCTA'
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  stagger,
  VIEWPORT_ONCE,
  CTA_ATTENTION_ANIMATE,
  CTA_ATTENTION_TRANSITION,
} from '@/lib/motion'
import { cn } from '@/lib/utils'
import { CALENDLY } from '@/lib/config'
import { ASSETS } from '@/lib/assets'
import { loadUtm, utmQueryString } from '@/lib/utm'

interface CheckoutState {
  name?: string
  email?: string
  phone?: string
  orderId?: string
  paymentId?: string
  amountPaid?: number
  coupon?: string
}

const helpsYou = [
  {
    icon: Heart,
    text: 'Understand which recovery factors may be having the biggest impact on your energy, hair, mood and overall wellbeing',
  },
  {
    icon: Eye,
    text: 'Identify the most likely recovery gaps based on your symptoms, health history and postpartum journey',
  },
  {
    icon: Lightbulb,
    text: 'Connect the dots between your symptoms and what your body may actually be asking for',
  },
  {
    icon: Target,
    text: 'Understand which areas deserve your attention first instead of trying to fix everything at once',
  },
  {
    icon: Compass,
    text: 'Gain clarity on what may be slowing your recovery and where to focus next',
  },
  {
    icon: Sparkles,
    text: 'Get the maximum value from The Postpartum Restore™ based on your unique situation',
  },
]

const especiallyHelpful = [
  "You're tired of guessing and would like personalised guidance on what may be affecting your recovery.",
  "You've tried supplements, diets or advice online but still aren't seeing meaningful changes.",
  'You want help understanding which symptoms matter most and which areas deserve your attention first.',
  "You'd feel more confident beginning your recovery journey with expert guidance and a clearer roadmap.",
  'You want someone to look at the bigger picture rather than treating each symptom separately.',
]

function buildCalendlyUrl(state: CheckoutState): string {
  if (!CALENDLY.url) return ''
  const url = new URL(CALENDLY.url)
  if (state.name) url.searchParams.set('name', state.name)
  if (state.email) url.searchParams.set('email', state.email)
  if (state.phone) url.searchParams.set('a1', state.phone)
  if (state.orderId) url.searchParams.set('a2', state.orderId)

  const utm = loadUtm()
  if (utm.utm_source) url.searchParams.set('utm_source', utm.utm_source)
  if (utm.utm_medium) url.searchParams.set('utm_medium', utm.utm_medium)
  if (utm.utm_campaign) url.searchParams.set('utm_campaign', utm.utm_campaign)
  if (utm.utm_term) url.searchParams.set('utm_term', utm.utm_term)
  if (utm.utm_content) url.searchParams.set('utm_content', utm.utm_content)

  if (CALENDLY.hideGdpr) url.searchParams.set('hide_gdpr_banner', '1')
  if (CALENDLY.hideEventTypeDetails)
    url.searchParams.set('hide_event_type_details', '1')
  url.searchParams.set('background_color', 'ffffff')
  url.searchParams.set('text_color', '1f1e1e')
  url.searchParams.set('primary_color', 'CB4A5D')

  return url.toString()
}

export default function BookACallPage() {
  const router = useRouter()
  // Read once from the funnel carrier (set by the checkout page before push).
  const [checkoutState] = useState<CheckoutState>(() => getFunnelState<CheckoutState>() ?? {})

  const calendlyUrl = useMemo(() => buildCalendlyUrl(checkoutState), [checkoutState])

  useEffect(() => {
    document.title = "You're In · Claim Your Bonus Call · Suvidhi"
    window.scrollTo({ top: 0 })

    const onMessage = (ev: MessageEvent) => {
      const data = ev.data
      if (!data || typeof data !== 'object') return
      const eventName = (data as { event?: string }).event
      if (eventName === 'calendly.event_scheduled') {
        // No browser Meta event fires here (only PageView is allowed). The call
        // booking is reflected in the CRM Sheet, where the sales team marks the
        // lead "qualified" → the Apps Script fires the downstream QualifiedLead
        // CAPI event.
        setFunnelState(checkoutState)
        router.push('/thank-you' + utmQueryString())
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [router, checkoutState])

  return (
    <div className="relative min-h-screen flex flex-col">
      <TopMarquee />

      <main className="relative flex-1">
        {/* ───────────────── HERO — "You're In" confirmation ───────────────── */}
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-[55vh] blur-3xl opacity-70"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(236,158,169,.55), transparent 70%)',
              }}
            />
          </div>

          <Container className="relative pt-8 pb-10 sm:pt-12 sm:pb-12">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-700 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Back to home
              </Link>
              <ol className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-xs font-medium">
                <li className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-ink-100 text-ink-500">
                  <CheckCircle2 className="w-3 h-3 text-brand-600" /> 1. Details
                </li>
                <span aria-hidden className="hidden sm:block w-4 h-px bg-ink-200" />
                <li className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-brand-600 animate-ping opacity-75" />
                    <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-brand-600" />
                  </span>
                  2. Claim your bonus call
                </li>
                <span aria-hidden className="hidden sm:block w-4 h-px bg-ink-200" />
                <li className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-ink-100 text-ink-500">
                  3. Confirmed
                </li>
              </ol>
            </div>

            <motion.div
              variants={stagger(0.08, 0.07)}
              initial="hidden"
              animate="show"
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={fadeUp}>
                <span className="eyebrow whitespace-nowrap !tracking-[0.16em] sm:!tracking-[0.18em] !text-[10px] sm:!text-[11px]">
                  <Sparkles className="w-3 h-3" />
                  <span className="sm:hidden">You're in · Bonus included</span>
                  <span className="hidden sm:inline">
                    You're in · Bonus included with your purchase
                  </span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="h-display mt-5 text-balance"
              >
                Your access to{' '}
                <span className="grad-text">The Postpartum Restore</span> is
                confirmed.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-ink-700 text-[16.5px] sm:text-lg leading-relaxed max-w-2xl mx-auto text-pretty"
              >
                As part of your purchase, you also received a complimentary{' '}
                <strong className="text-ink-950">30-Minute Postpartum
                Assessment Call with Suvidhi</strong>. Before you begin working
                through the assessment and audits, we'd love to help you claim it.
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* ───────────────── BONUS CALL — "Claim your BONUS 1:1 Assessment Call" ───────────────── */}
        <section className="relative pb-14 sm:pb-16">
          <Container>
            {/* Looping pop callout — draws the eye every few seconds without
                being noisy. Replaces the section heading because the page
                already has the "Your access is confirmed" hero above it. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.025, 1], y: [0, -2, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative rounded-full overflow-hidden shadow-elev"
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(95deg, #391218 0%, #963543 45%, #CB4A5D 100%)',
                  }}
                />
                {/* Shine sweep — infinite loop */}
                <motion.span
                  aria-hidden
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 1.6,
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/3"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.32) 50%, transparent 100%)',
                  }}
                />
                {/* Soft halo glow loop behind */}
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(60% 90% at 50% 100%, rgba(236,158,169,.45), transparent 70%)',
                  }}
                />
                <div className="relative flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 text-cream">
                  <motion.span
                    animate={{ rotate: [0, -10, 0, 10, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="inline-flex shrink-0"
                  >
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-brand-200" />
                  </motion.span>
                  <span className="text-[11.5px] sm:text-[13px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-center text-balance">
                    Claim your BONUS · 1:1 Call with Suvidhi
                  </span>
                  <motion.span
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="inline-flex shrink-0"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brand-200" />
                  </motion.span>
                </div>
              </motion.div>
              <p className="mt-5 sm:mt-6 text-center text-ink-700 text-[15.5px] sm:text-[16.5px] leading-relaxed max-w-xl mx-auto text-pretty">
                During this private one-on-one conversation, Suvidhi will help you
                understand exactly where your body is — and what it needs next.
              </p>
            </motion.div>

            <motion.ul
              variants={stagger(0.08, 0.06)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="mt-12 grid md:grid-cols-2 gap-4 sm:gap-5"
            >
              {helpsYou.map((item) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={item.text}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative card card-hover p-5 sm:p-6 flex items-start gap-4 overflow-hidden"
                  >
                    <span className="icon-tile-lg shrink-0 group-hover:scale-110 group-hover:shadow-ring transition-all duration-500">
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </span>
                    <p className="text-ink-800 text-[15.5px] leading-relaxed text-pretty pt-1.5">
                      {item.text}
                    </p>
                  </motion.li>
                )
              })}
            </motion.ul>
          </Container>
        </section>

        {/* ───────────────── ESPECIALLY HELPFUL IF ───────────────── */}
        <section className="relative py-14 sm:py-16">
          <Container>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="relative max-w-4xl mx-auto rounded-[32px] overflow-hidden border border-brand-200/60 shadow-soft"
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: 'rgba(203,74,93,0.06)' }}
              />
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-40"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(236,158,169,.55), transparent 70%)',
                }}
              />
              <div className="relative p-6 sm:p-9 lg:p-11">
                <div className="text-center mb-8 sm:mb-10">
                  <span className="eyebrow">
                    <ListChecks className="w-3 h-3" />
                    Is this call right for you?
                  </span>
                  <h2 className="h-sub mt-4 text-balance">
                    This Call Will Be{' '}
                    <span className="grad-text">Especially Helpful</span> If…
                  </h2>
                </div>

                <motion.ul
                  variants={stagger(0.06, 0.06)}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT_ONCE}
                  className="space-y-3.5"
                >
                  {especiallyHelpful.map((t) => (
                    <motion.li
                      key={t}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 inline-flex w-7 h-7 rounded-full bg-brand-100 text-brand-700 border border-brand-200/60 items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                      </span>
                      <span className="text-ink-800 text-[15.5px] leading-relaxed text-pretty">
                        {t}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ───────────────── TWO GOOD WAYS TO BEGIN ───────────────── */}
        <section className="relative py-14 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Pick your starting point"
              title={
                <>
                  You Have <span className="grad-text">Two Good Ways</span> To
                  Begin
                </>
              }
              subtitle="Either path leads to the same outcome. Pick whichever feels right for where you are today."
            />

            <div className="mt-12 sm:mt-14 grid lg:grid-cols-2 gap-5 lg:gap-7">
              {/* Option 1 — Book the assessment first */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[28px] overflow-hidden shadow-elev border border-brand-200/60"
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(160deg, #391218 0%, #5d2129 40%, #963543 100%)',
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      'radial-gradient(60% 50% at 30% 0%, rgba(236,158,169,.5) 0%, transparent 60%)',
                  }}
                />
                <div className="relative p-7 sm:p-8 text-cream flex flex-col h-full text-center lg:text-left items-center lg:items-stretch">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-cream/90 text-[11px] uppercase tracking-[0.22em] font-semibold self-center lg:self-start">
                    <Sparkles className="w-3 h-3 text-brand-200" /> Option 1 ·
                    Recommended
                  </div>
                  <h3 className="mt-4 font-display text-2xl sm:text-[1.6rem] font-semibold text-cream leading-tight">
                    Book Your Postpartum Assessment Call First
                  </h3>
                  <p className="mt-3 text-cream/85 text-[15px] leading-relaxed max-w-sm">
                    Get personalised guidance from Suvidhi before diving into the
                    programme.
                  </p>
                  <p className="mt-3 text-cream/80 text-[15px] leading-relaxed max-w-sm">
                    This is ideal if you'd like help understanding your symptoms,
                    identifying your biggest recovery bottlenecks, and knowing
                    where to focus first.
                  </p>
                  <p className="mt-3 text-cream/80 text-[15px] leading-relaxed max-w-sm">
                    Many mothers choose this option because it gives them clarity
                    and direction before they begin working through the audits.
                  </p>
                  <div className="mt-auto pt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-semibold text-brand-200">
                    <CalendarCheck className="w-3.5 h-3.5" />
                    Reserve a slot below
                  </div>
                </div>
              </motion.div>

              {/* Option 2 — Start the programme immediately */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative card card-hover p-7 sm:p-8 flex flex-col text-center lg:text-left items-center lg:items-stretch"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-ink-50 border border-ink-100 text-ink-700 text-[11px] uppercase tracking-[0.22em] font-semibold self-center lg:self-start">
                  <Compass className="w-3 h-3" /> Option 2
                </div>
                <h3 className="mt-4 font-display text-2xl sm:text-[1.6rem] font-semibold text-ink-950 leading-tight">
                  Start The Postpartum Restore Immediately
                </h3>
                <p className="mt-3 text-ink-700 text-[15px] leading-relaxed max-w-sm">
                  If you'd prefer to explore the material first, that's perfectly
                  okay too.
                </p>
                <p className="mt-3 text-ink-700 text-[15px] leading-relaxed max-w-sm">
                  Go through the modules at your own pace, complete the exercises,
                  and allow the insights to unfold naturally.
                </p>
                <p className="mt-3 text-ink-700 text-[15px] leading-relaxed max-w-sm">
                  Your complimentary 1:1 Clarity Call will still be available
                  whenever you feel ready for more personalised guidance.
                </p>
                <p className="mt-auto pt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-semibold text-brand-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  Either way, you're moving in the right direction
                </p>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ───────────────── PERSONAL NOTE FROM SUVIDHI ─────────────────
            Highlighted, hand-written (Pacifico) note in a tinted card. */}
        <section className="relative py-10 sm:py-12">
          <Container size="narrow">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="relative mx-auto max-w-2xl"
            >
              <div className="relative rounded-[28px] surface-tint border border-brand-200/60 shadow-soft overflow-hidden p-7 sm:p-9 lg:p-10 text-center">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-50 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(closest-side, rgba(236,158,169,.6), transparent 70%)',
                  }}
                />
                <div className="relative inline-flex eyebrow">
                  <MessageSquareHeart className="w-3 h-3" />
                  A personal note from Suvidhi
                </div>

                <div className="relative mt-6 space-y-4 text-brand-800 text-[1.05rem] sm:text-[1.2rem] leading-relaxed text-pretty">
                  <p className="font-script" style={{ fontFamily: "'Pacifico', cursive" }}>
                    I personally conduct every Postpartum Assessment Call myself.
                  </p>
                  <p className="font-script" style={{ fontFamily: "'Pacifico', cursive" }}>
                    Because my coaching schedule is limited, I can only accommodate a
                    limited number of calls each week.
                  </p>
                  <p className="font-script" style={{ fontFamily: "'Pacifico', cursive" }}>
                    If you'd like to take advantage of this bonus session included with
                    your purchase, I encourage you to reserve your spot now.
                  </p>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ───────────────── CALENDAR WITH SLOTS ───────────────── */}
        <section id="calendar" className="relative pb-16 sm:pb-20">
          <Container>
            <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-white border border-ink-100 shadow-elev">
              <div className="px-5 sm:px-7 py-4 sm:py-5 flex items-center gap-3 border-b border-ink-100 bg-cream-dark/40">
                <span className="icon-tile w-10 h-10 rounded-xl">
                  <CalendarCheck className="w-4 h-4" strokeWidth={2} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-[16px] font-semibold text-ink-950 leading-tight">
                    Pick a time that works for you
                  </div>
                  <div className="text-[12.5px] text-ink-600">
                    30-min 1:1 with Suvidhi · Google Meet
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.18em] font-semibold text-brand-700 bg-brand-50 border border-brand-200/60 px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" /> Live calendar
                </span>
              </div>

              {calendlyUrl ? (
                <iframe
                  src={calendlyUrl}
                  title="Schedule your Postpartum Assessment Call"
                  width="100%"
                  height="780"
                  frameBorder={0}
                  loading="lazy"
                  className="block w-full min-h-[680px]"
                />
              ) : (
                <CalendlyPlaceholder />
              )}
            </div>

            <p className="mt-6 text-center text-[13px] text-ink-600">
              Trouble seeing the calendar? Disable your ad-blocker, or write to
              us at{' '}
              <a
                href="mailto:innohealthbysush@gmail.com"
                className="text-brand-700 font-semibold underline-offset-2 hover:underline"
              >
                innohealthbysush@gmail.com
              </a>
              .
            </p>
          </Container>
        </section>
      </main>

      <Footer hideCTA />
      <BookACallStickyCTA targetId="calendar" />
    </div>
  )
}

function CalendlyPlaceholder() {
  return (
    <div className="p-8 sm:p-12 text-center">
      <span className="inline-flex w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200/60 items-center justify-center mx-auto">
        <CalendarCheck className="w-7 h-7" strokeWidth={1.75} />
      </span>
      <h4 className="mt-4 font-display text-xl font-semibold text-ink-950">
        Calendar coming up
      </h4>
      <p className="mt-2 text-ink-600 max-w-sm mx-auto text-[14.5px] leading-relaxed">
        Add your Calendly event URL to{' '}
        <code className="px-1.5 py-0.5 rounded bg-cream-dark border border-ink-100 text-[12.5px] text-ink-800">
          NEXT_PUBLIC_CALENDLY_URL
        </code>{' '}
        in the <code>.env</code> file and reload to embed the live booking
        widget here.
      </p>
    </div>
  )
}

function ScrollToCalendarButton({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const onClick = () => {
    const el = document.getElementById('calendar')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      animate={reduce ? undefined : CTA_ATTENTION_ANIMATE}
      transition={reduce ? undefined : CTA_ATTENTION_TRANSITION}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2.5',
        'rounded-full font-semibold tracking-tight whitespace-nowrap',
        'bg-brand-600 hover:bg-brand-700 text-white',
        'px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-[15px]',
        'shadow-elev hover:shadow-glow',
        'transition-all duration-500 ease-out hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30',
        'overflow-hidden',
        className,
      )}
    >
      {/* Continuous shine loop — even at rest the button shows a slow sweep */}
      <motion.span
        aria-hidden
        initial={{ x: '-120%' }}
        animate={{ x: '120%' }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 1.2,
        }}
        className="pointer-events-none absolute inset-y-0 w-1/3"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.35) 50%, transparent 100%)',
        }}
      />
      {/* Subtle hover radial highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(80% 100% at 50% 0%, rgba(255,255,255,.35), transparent 70%)',
        }}
      />
      <span className="relative">Pick your slot</span>
      <motion.span
        aria-hidden
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative inline-flex"
      >
        <ArrowDown className="w-4 h-4" />
      </motion.span>
    </motion.button>
  )
}
