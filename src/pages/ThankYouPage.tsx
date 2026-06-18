import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Eye,
  FileText,
  Mail,
  MessageCircle,
  MessageSquare,
  MessageSquareHeart,
  PlayCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { TopMarquee } from '@/components/sections/TopMarquee'
import { Footer } from '@/components/sections/Footer'
import { fadeUp, scaleIn, stagger, VIEWPORT_ONCE } from '@/lib/motion'
import { BRAND, WHATSAPP } from '@/lib/config'
import { appendUtm } from '@/lib/utm'
import { pixelTrack } from '@/lib/tracking'

interface ThankYouState {
  name?: string
  email?: string
  phone?: string
  orderId?: string
  paymentId?: string
  amountPaid?: number
  coupon?: string
}

const howToStart = [
  {
    icon: Users,
    title: 'Open the community',
    desc: 'Use the button above, or the link in your email, to step inside.',
  },
  {
    icon: PlayCircle,
    title: 'Watch the short welcome video first',
    desc: 'It maps out everything so you know how the pieces fit.',
  },
  {
    icon: BookOpen,
    title: 'Start Module 1, The Depletion Reality',
    desc: "Keep your most recent blood report nearby if you have one. You'll use it inside the lesson.",
  },
  {
    icon: ClipboardCheck,
    title: 'Download Audit 1 and fill it in',
    desc: "That's your first stall point, found in about five minutes.",
  },
]

const whatYouUnlocked = [
  {
    icon: PlayCircle,
    title: '5 short lessons',
    desc: "That explain why you still don't feel like yourself.",
  },
  {
    icon: ClipboardCheck,
    title: '4 clinical audits',
    desc: 'You fill in and keep — and can take to any doctor.',
  },
  {
    icon: Compass,
    title: 'The High-Performance Readiness Scorecard',
    desc: 'So you know your next step.',
  },
  {
    icon: MessageCircle,
    title: 'A private community',
    desc: 'To follow along and ask your questions.',
  },
]

const noteBullets = [
  { icon: Eye, label: 'Watch honestly.' },
  { icon: ClipboardCheck, label: 'Run the audits.' },
  { icon: Sparkles, label: 'Clarity will follow.' },
]

export default function ThankYouPage() {
  const { state } = useLocation() as { state: ThankYouState | null }
  const s = state ?? {}
  // Tracks hover on the "Enter the community" pill so we can sweep a shine
  // across it on enter and instantly snap it back on leave (no reverse sweep).
  const [accessHovered, setAccessHovered] = useState(false)
  const firstName = s.name?.split(' ')[0]

  useEffect(() => {
    document.title = "You're in · Welcome to The Postpartum Restore"
    window.scrollTo({ top: 0 })
    pixelTrack('CompleteRegistration', {
      content_name: 'The Postpartum Restore',
      value: s.amountPaid,
      currency: 'INR',
    })
  }, [s.amountPaid])

  const communityUrl = WHATSAPP.communityUrl ? appendUtm(WHATSAPP.communityUrl) : ''

  return (
    <div className="relative min-h-screen flex flex-col">
      <TopMarquee />

      <main className="relative flex-1">
        {/* ───────────────── SECTION 01 — CONFIRMATION HERO ───────────────── */}
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-[60vh] blur-3xl opacity-70"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(236,158,169,.55), transparent 70%)',
              }}
            />
            <div
              className="absolute top-40 -right-20 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(255,202,74,.30), transparent 70%)',
              }}
            />
          </div>

          <Container className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 lg:pt-20">
            <motion.div
              variants={stagger(0.1, 0.08)}
              initial="hidden"
              animate="show"
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={scaleIn} className="flex justify-center">
                <div className="relative">
                  <span
                    aria-hidden
                    className="pulse-beacon"
                    style={{ animationDuration: '2.6s' }}
                  />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-elev">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2} />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 inline-flex">
                <span className="eyebrow">
                  <CheckCircle2 className="w-3 h-3" />
                  Payment confirmed
                </span>
              </motion.div>

              <motion.p variants={fadeUp} className="mt-5 text-lg sm:text-xl text-ink-700">
                {firstName ? `${firstName}, you're in.` : "You're in."}
              </motion.p>

              <motion.h1 variants={fadeUp} className="h-display mt-2 text-balance">
                Welcome to{' '}
                <span className="grad-text">The Postpartum Restore.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-ink-700 text-[16.5px] sm:text-lg leading-relaxed max-w-xl mx-auto text-pretty"
              >
                You're not here to try one more thing. You're here to find out
                what your body actually needs — and stop guessing.
              </motion.p>

              {(s.orderId || typeof s.amountPaid === 'number') && (
                <motion.div
                  variants={fadeUp}
                  className="mt-8 inline-flex flex-wrap justify-center items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-ink-100 shadow-soft text-sm text-ink-700"
                >
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>
                    {s.orderId && (
                      <>
                        Order{' '}
                        <span className="font-semibold text-ink-950">
                          {s.orderId}
                        </span>
                      </>
                    )}
                    {typeof s.amountPaid === 'number' && (
                      <>
                        {' · '}Paid{' '}
                        <span className="font-semibold text-ink-950">
                          ₹{s.amountPaid.toLocaleString('en-IN')}
                        </span>
                      </>
                    )}
                    {s.coupon && (
                      <>
                        {' · '}Coupon{' '}
                        <span className="font-semibold text-ink-950">
                          {s.coupon}
                        </span>
                      </>
                    )}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </Container>
        </section>

        {/* ───────────────── SECTION 02 — GET INSTANT ACCESS ───────────────── */}
        <section className="relative pb-4 sm:pb-6">
          <Container size="narrow">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="text-center mb-6"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-950 leading-tight">
                Your access is ready
              </h2>
              <p className="mt-3 text-ink-700 text-[16px] leading-relaxed max-w-xl mx-auto text-pretty">
                Everything lives in one private community. The welcome video,
                all 5 lessons, the 4 audits, and your readiness scorecard.
              </p>
            </motion.div>

            {/* Centered pill button — compact, looks like a proper CTA.
                Continuous y + scale pop loop on the outer; whileHover overrides
                with a slightly stronger lift during hover and returns to the
                loop on un-hover. Halo glow loops behind. Hover shine sweeps
                left → right once per enter, snaps back instantly on leave. */}
            <div className="flex justify-center">
              <motion.a
                href={communityUrl || '#'}
                target={communityUrl ? '_blank' : undefined}
                rel={communityUrl ? 'noopener noreferrer' : undefined}
                onClick={() =>
                  pixelTrack('Lead', { content_name: 'Community Access' })
                }
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, -2, 0],
                  scale: [1, 1.022, 1],
                }}
                transition={{
                  opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
                }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setAccessHovered(true)}
                onHoverEnd={() => setAccessHovered(false)}
                className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full overflow-hidden shadow-elev border border-brand-200/60 text-white font-semibold text-[15px] sm:text-[16px] tracking-tight whitespace-nowrap focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30"
              >
                {/* Background gradient */}
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, #391218 0%, #5d2129 45%, #963543 100%)',
                  }}
                />
                {/* Continuous halo glow loop */}
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.3, 0.65, 0.3] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(80% 130% at 50% 100%, rgba(236,158,169,.55), transparent 70%)',
                  }}
                />
                {/* Hover-triggered diagonal shine sweep */}
                <motion.span
                  aria-hidden
                  initial={{ x: '-150%' }}
                  animate={{ x: accessHovered ? '350%' : '-150%' }}
                  transition={{
                    duration: accessHovered ? 1 : 0,
                    ease: 'easeOut',
                  }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 z-10 skew-x-[-12deg]"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.55) 50%, transparent 100%)',
                  }}
                />
                {/* Soft top-edge highlight so the pill feels dimensional */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-60"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 100%)',
                  }}
                />

                {/* Label content — sits above all visual layers */}
                <Sparkles className="relative w-4 h-4 text-accent-300 shrink-0" />
                <span className="relative">Join the community</span>
                <ArrowRight
                  className="relative w-[18px] h-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0"
                  strokeWidth={2.25}
                />
              </motion.a>
            </div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="mt-4 text-center text-[13.5px] text-ink-600 italic"
            >
              We've also sent your access link to{' '}
              <span className="font-semibold text-ink-900 not-italic">
                {s.email ?? 'your email'}
              </span>
              . Check your inbox, and your spam folder just in case.
            </motion.p>
          </Container>
        </section>

        {/* ───────────────── SECTION 03 — START HERE, IN THIS ORDER ───────────────── */}
        <section className="relative py-14 sm:py-16">
          <Container>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
            >
              <span className="eyebrow">
                <Compass className="w-3 h-3" />
                The order matters
              </span>
              <h2 className="h-section mt-4 text-balance">
                Start here, <span className="grad-text">in this order</span>
              </h2>
            </motion.div>

            <motion.ol
              variants={stagger(0.1, 0.07)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto"
            >
              {howToStart.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.li
                    key={step.title}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative card card-hover p-6 overflow-hidden"
                  >
                    <div className="absolute top-5 right-5 font-display text-3xl text-ink-100 group-hover:text-brand-100 transition-colors duration-500">
                      0{i + 1}
                    </div>
                    <span className="icon-tile-lg group-hover:scale-110 group-hover:shadow-ring transition-all duration-500">
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink-950 leading-tight text-balance">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-ink-600 text-[15px] leading-relaxed text-pretty">
                      {step.desc}
                    </p>
                  </motion.li>
                )
              })}
            </motion.ol>

            {/* Tip box */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="mt-8 max-w-3xl mx-auto rounded-2xl surface-tint border border-brand-200/60 p-5 flex items-start gap-3"
            >
              <Sparkles
                className="w-5 h-5 text-brand-700 mt-0.5 shrink-0"
                strokeWidth={2}
              />
              <p className="text-ink-800 text-[14.5px] leading-relaxed italic m-0">
                <strong className="text-ink-950 not-italic">Tip:</strong> the
                lessons are short — about 22 to 25 minutes in total. You can
                watch them while feeding, or in pieces between everything else.
                There's no rush, and nothing expires.
              </p>
            </motion.div>
          </Container>
        </section>

        {/* ───────────────── SECTION 04 — WHAT YOU JUST UNLOCKED ───────────────── */}
        <section className="relative py-14 sm:py-16">
          <Container>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
            >
              <span className="eyebrow">
                <Sparkles className="w-3 h-3" />
                In your toolkit
              </span>
              <h2 className="h-section mt-4 text-balance">
                What you <span className="grad-text">just unlocked</span>
              </h2>
            </motion.div>

            <motion.ul
              variants={stagger(0.08, 0.07)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto"
            >
              {whatYouUnlocked.map((item) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={item.title}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative card card-hover p-5 sm:p-6 flex items-start gap-4 overflow-hidden"
                  >
                    <span className="icon-tile-lg shrink-0 group-hover:scale-110 group-hover:shadow-ring transition-all duration-500">
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.05rem] sm:text-[1.15rem] font-semibold text-ink-950 leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-ink-600 text-[14.5px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="mt-8 text-center text-ink-700 italic max-w-xl mx-auto text-[15px]"
            >
              The four audits are yours to keep, whatever you decide to do next.
            </motion.p>
          </Container>
        </section>

        {/* ───────────────── SECTION 05 — NEED HELP GETTING IN ───────────────── */}
        <section className="relative pb-14 sm:pb-16">
          <Container>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border border-accent-200/60 bg-accent-50/60 p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-100 text-accent-700 border border-accent-200/60 shrink-0">
                    <Mail className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl font-semibold text-ink-950 leading-tight">
                      Didn't get your access email?
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      <li className="flex items-start gap-2.5 text-ink-800 text-[15px] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 mt-1 shrink-0" />
                        <span>
                          Check your spam and promotions folders first.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5 text-ink-800 text-[15px] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 mt-1 shrink-0" />
                        <span>
                          Still nothing after a few minutes? Reply to your
                          payment receipt, or write to us at{' '}
                          <a
                            href={`mailto:${BRAND.email}`}
                            className="font-semibold text-brand-700 underline-offset-2 hover:underline break-all"
                          >
                            {BRAND.email}
                          </a>
                          , and we'll get you in.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* ───────────────── SECTION 06 — A NOTE FROM SUVIDHI ─────────────────
            Image removed — minimal centered card. */}
        <section className="relative pb-16 sm:pb-20">
          <Container size="narrow">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="relative mx-auto max-w-3xl rounded-[28px] overflow-hidden border border-white/60 shadow-elev bg-white p-6 sm:p-8 lg:p-10 text-center"
            >
              <div
                aria-hidden
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-50 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(236,158,169,.55), transparent 70%)',
                }}
              />
              <div className="relative inline-flex eyebrow">
                <MessageSquareHeart className="w-3 h-3" />
                A note from Suvidhi
              </div>
              <Quote
                className="relative w-8 sm:w-9 h-8 sm:h-9 text-brand-300 mt-4 sm:mt-5 mx-auto"
                strokeWidth={1.5}
              />
              <p className="relative mt-3 font-display text-[1.2rem] sm:text-[1.4rem] lg:text-[1.5rem] leading-[1.4] text-ink-900 text-balance">
                This is not about getting everything right. It is about
                observation, then adjustment, then understanding what
                actually works for your body.
              </p>

              <ul className="relative mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-md mx-auto">
                {noteBullets.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-50 border border-brand-200/60 text-brand-800"
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    <span className="font-display text-[13px] sm:text-sm font-semibold">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tiny support row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="mt-8 max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border border-ink-100 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="icon-tile w-11 h-11 rounded-xl shrink-0">
                  <MessageSquare className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-base sm:text-lg font-semibold text-ink-950 leading-tight">
                    Stuck on something? We're a message away.
                  </h4>
                  <p className="mt-1 text-ink-700 text-[14px] leading-relaxed">
                    Write to{' '}
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="font-semibold text-brand-700 underline-offset-2 hover:underline break-all"
                    >
                      {BRAND.email}
                    </a>{' '}
                    or call{' '}
                    <a
                      href={`tel:${BRAND.phone}`}
                      className="font-semibold text-brand-700 underline-offset-2 hover:underline"
                    >
                      {BRAND.phoneDisplay}
                    </a>
                    . Same working day, every time.
                  </p>
                </div>
                <Link
                  to="/"
                  className="group inline-flex items-center gap-1.5 self-stretch sm:self-auto justify-center px-5 py-2.5 rounded-full bg-white border border-ink-200 text-ink-900 font-semibold text-sm hover:border-brand-500 hover:text-brand-700 transition-all"
                >
                  Back home
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="mt-10 max-w-3xl mx-auto text-center text-[11.5px] leading-relaxed text-ink-500"
            >
              All content, programmes, consultations and materials provided by
              Innohealth are for educational and informational purposes only. We
              do not guarantee specific health outcomes, medical results, or
              future performance. Nothing on this site, in our programmes,
              consultations or communications constitutes medical advice,
              diagnosis or treatment. Always consult your physician or a
              qualified healthcare provider before making changes related to
              your health, medication, nutrition or lifestyle — especially
              during postpartum recovery. Results shared are illustrative of
              individual experiences only and should not be considered typical
              or guaranteed outcomes. This website is not part of the Meta
              platform and is not endorsed by Meta in any way. FACEBOOK and
              INSTAGRAM are trademarks of Meta Platforms, Inc.
            </motion.p>
          </Container>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  )
}

// Suppress unused imports of icons we wired into a re-export pattern.
void FileText
