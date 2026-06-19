import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { setFunnelState } from '@/lib/funnelState'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  User,
  X,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Countdown } from '@/components/ui/Countdown'
import { TopMarquee } from '@/components/sections/TopMarquee'
import { Footer } from '@/components/sections/Footer'
import { cn, formatINR } from '@/lib/utils'
import { fadeUp, stagger } from '@/lib/motion'
import { OFFER, COUPON } from '@/lib/config'
import { startCheckout } from '@/lib/razorpay'
import { captureUtm, utmPayload, utmQueryString } from '@/lib/utm'
import { pabblyEvent, pixelTrack, reportMilestone } from '@/lib/tracking'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string | undefined
  city: string
  condition: string
  hba1c: string
  consent: boolean
}

interface CouponState {
  code: string
  applied: boolean
  discountPct: number
  invalid?: boolean
}

const initial: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: undefined,
  city: '',
  condition: '',
  hba1c: '',
  consent: false,
}

const conditions = [
  'Pre-diabetes',
  'Type-2 diabetes (early stage)',
  'Type-2 diabetes (long-standing)',
  'Family history · concerned',
  'Other metabolic concern',
]

const hba1cRanges = [
  '< 5.7 (Normal)',
  '5.7 – 6.4 (Pre-diabetes)',
  '6.5 – 7.5',
  '7.6 – 9.0',
  '> 9.0',
  "I don't know yet",
]

export default function CheckoutPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [coupon, setCoupon] = useState<CouponState>({
    code: '',
    applied: false,
    discountPct: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  // Raw error surfaced from Razorpay's `payment.failed` event so the user
  // sees WHAT went wrong (declined card, blocked transaction, etc.) instead
  // of a silent "nothing happened" state.
  const [paymentError, setPaymentError] = useState<{
    message: string
    code?: string
    reason?: string
  } | null>(null)
  // Mobile-only accordion state for the order summary. Default: closed so the
  // form is visible immediately on entering the page. Ignored on lg+.
  const [summaryOpen, setSummaryOpen] = useState(false)

  const basePrice = OFFER.price
  const discountAmount = Math.round((basePrice * coupon.discountPct) / 100)
  const payable = Math.max(0, basePrice - discountAmount)
  const isFreeAfterCoupon = coupon.applied && payable === 0
  const fullName = `${form.firstName} ${form.lastName}`.trim()

  // Generate a session order ID once
  const [orderId] = useState(
    () =>
      'SVD-' +
      Date.now().toString(36).toUpperCase() +
      '-' +
      Math.floor(Math.random() * 1000)
        .toString(36)
        .toUpperCase(),
  )

  useEffect(() => {
    document.title = 'Checkout · Suvidhi Clarity Call'
    window.scrollTo({ top: 0 })
    captureUtm()
    // Fire InitiateCheckout pixel + Pabbly event on mount
    pixelTrack('InitiateCheckout', {
      value: basePrice,
      currency: OFFER.currency,
      content_name: OFFER.name,
    })
    pabblyEvent({
      event: 'checkout.started',
      amount: basePrice,
      orderId,
      isTest: OFFER.price <= 1,
    })
  }, [basePrice, orderId])

  const applyCoupon = () => {
    const code = coupon.code.trim().toUpperCase()
    if (!code) return
    if (code === COUPON.code) {
      setCoupon({ code, applied: true, discountPct: COUPON.discountPct })
      pabblyEvent({ event: 'coupon.applied', coupon: code, amount: 0 })
    } else {
      setCoupon({ ...coupon, code, applied: false, invalid: true })
    }
  }

  const clearCoupon = () => {
    setCoupon({ code: '', applied: false, discountPct: 0 })
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.firstName.trim()) next.firstName = 'Please share your first name'
    if (!form.lastName.trim()) next.lastName = 'Please share your last name'
    if (!form.email.trim()) next.email = 'We need an email to send the call link'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'That email looks off — please check'
    if (!form.phone) next.phone = 'Please add a reachable number'
    if (!form.city.trim()) next.city = 'Please add your town or city'
    if (!form.condition) next.condition = 'Pick the closest match'
    if (!form.hba1c) next.hba1c = 'Even a rough range helps'
    if (!form.consent) next.consent = 'Please accept the terms'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goToBookACall = (paymentId?: string) => {
    pabblyEvent({
      event: 'payment.success',
      name: fullName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      condition: form.condition,
      hba1c: form.hba1c,
      amount: payable,
      coupon: coupon.applied ? coupon.code : undefined,
      orderId,
      paymentId,
      isTest: OFFER.price <= 1,
    })
    reportMilestone('Purchase', {
      name: fullName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      amount: payable,
      orderId,
      paymentId,
      coupon: coupon.applied ? coupon.code : undefined,
      condition: form.condition,
      hba1c: form.hba1c,
      isTest: OFFER.price <= 1,
    })
    setFunnelState({
      name: fullName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      orderId,
      paymentId,
      amountPaid: payable,
      coupon: coupon.applied ? coupon.code : undefined,
    })
    router.push('/book-a-call' + utmQueryString())
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setPaymentError(null)

    // Track lead
    reportMilestone('Lead', {
      name: fullName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      amount: payable,
      coupon: coupon.applied ? coupon.code : undefined,
      condition: form.condition,
      hba1c: form.hba1c,
      isTest: OFFER.price <= 1,
    })

    // 100% off path → skip Razorpay
    if (isFreeAfterCoupon) {
      window.setTimeout(() => {
        goToBookACall(`FREE-${coupon.code}`)
      }, 600)
      return
    }

    // Razorpay: server creates order → modal opens → signature verified
    // server-side on success. All three steps live inside startCheckout().
    await startCheckout({
      amount: payable,
      receipt: orderId,
      customer: {
        name: fullName,
        email: form.email,
        phone: form.phone,
      },
      notes: {
        order_id: orderId,
        condition: form.condition,
        hba1c: form.hba1c,
        coupon: coupon.applied ? coupon.code : '',
        ...Object.fromEntries(
          Object.entries(utmPayload()).map(([k, v]) => [k, String(v ?? '')]),
        ),
      },
      onSuccess: (r) => {
        goToBookACall(r.razorpay_payment_id)
      },
      onDismiss: () => {
        setSubmitting(false)
      },
      onFailure: (failure) => {
        setSubmitting(false)
        setPaymentError({
          message: failure.message,
          code: failure.code,
          reason: failure.reason,
        })
        pabblyEvent({
          event: 'payment.failed',
          name: fullName,
          email: form.email,
          phone: form.phone,
          city: form.city,
          amount: payable,
          orderId,
          isTest: OFFER.price <= 1,
          meta: {
            razorpay_error_code: failure.code,
            razorpay_error_reason: failure.reason,
            razorpay_error_source: failure.source,
          },
        })
      },
    })
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <TopMarquee />

      <main className="relative flex-1 py-8 sm:py-12 lg:py-14">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Back to landing
            </Link>
            <ol className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-xs font-medium">
              <Step active label="1. Details" />
              <Sep />
              <Step label="2. Book your slot" />
              <Sep />
              <Step label="3. Confirmed" />
            </ol>
          </div>

          <motion.div
            variants={stagger(0.1, 0.06)}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start"
          >
            {/* LEFT — Form */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-7 order-2 lg:order-1 space-y-4"
            >
              {/* Mobile-only coupon card — lives with the form, not in the
                  order-summary accordion. Desktop renders its own copy inside
                  the sticky aside. */}
              <CouponCard
                coupon={coupon}
                setCoupon={setCoupon}
                applyCoupon={applyCoupon}
                clearCoupon={clearCoupon}
                className="lg:hidden"
              />

              <form
                onSubmit={onSubmit}
                noValidate
                className="relative rounded-3xl bg-white border border-ink-100 shadow-soft p-6 sm:p-8 space-y-5"
              >
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-950 leading-tight">
                    Your details
                  </h2>
                  <p className="mt-1.5 text-ink-600 text-sm">
                    Honest answers make the call dramatically more useful.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="First name"
                    error={errors.firstName}
                    icon={<User className="w-4 h-4" />}
                  >
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g. Mahesh"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                  </Field>

                  <Field
                    label="Last name"
                    error={errors.lastName}
                    icon={<User className="w-4 h-4" />}
                  >
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g. Sharma"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Email address"
                    error={errors.email}
                    icon={<Mail className="w-4 h-4" />}
                  >
                    <input
                      className="input"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </Field>

                  <Field label="WhatsApp number" error={errors.phone}>
                    <PhoneInput
                      international
                      defaultCountry="IN"
                      countryCallingCodeEditable={false}
                      placeholder="Enter your number"
                      value={form.phone}
                      onChange={(value) => setForm({ ...form, phone: value })}
                    />
                  </Field>
                </div>

                <Field
                  label="Town / City"
                  error={errors.city}
                  icon={<MapPin className="w-4 h-4" />}
                >
                  <input
                    className="input"
                    type="text"
                    placeholder="e.g. Mumbai"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Your concern" error={errors.condition}>
                    <PremiumSelect
                      value={form.condition}
                      onChange={(v) => setForm({ ...form, condition: v })}
                      options={conditions}
                      placeholder="Pick the closest match"
                    />
                  </Field>

                  <Field label="Latest HbA1c (rough)" error={errors.hba1c}>
                    <PremiumSelect
                      value={form.hba1c}
                      onChange={(v) => setForm({ ...form, hba1c: v })}
                      options={hba1cRanges}
                      placeholder="Select range"
                    />
                  </Field>
                </div>

                <Checkbox
                  checked={form.consent}
                  onChange={(c) => setForm({ ...form, consent: c })}
                  error={errors.consent}
                >
                  I'll fill the pre-call form honestly and treat the 30-minute slot
                  seriously. I understand this is educational, not medical advice. I
                  agree to the{' '}
                  <Link
                    href="/terms-and-conditions"
                    className="text-brand-700 underline-offset-2 hover:underline"
                  >
                    terms
                  </Link>
                  ,{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-brand-700 underline-offset-2 hover:underline"
                  >
                    privacy
                  </Link>{' '}
                  &{' '}
                  <Link
                    href="/refund-policy"
                    className="text-brand-700 underline-offset-2 hover:underline"
                  >
                    refund policy
                  </Link>
                  .
                </Checkbox>

                {/* Razorpay failure banner — surfaces the actual error so users
                    aren't stuck staring at a broken submit state. */}
                <AnimatePresence>
                  {paymentError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        role="alert"
                        className="rounded-2xl border border-brand-200 bg-brand-50/80 p-4 flex items-start gap-3"
                      >
                        <span className="mt-0.5 inline-flex w-7 h-7 rounded-full bg-brand-100 text-brand-700 border border-brand-200 items-center justify-center shrink-0">
                          <X className="w-4 h-4" strokeWidth={2.5} />
                        </span>
                        <div className="flex-1 min-w-0 text-[13.5px] leading-relaxed text-ink-800">
                          <div className="font-semibold text-ink-950">
                            Payment didn't go through
                          </div>
                          <p className="mt-0.5 text-pretty">
                            {paymentError.message}
                          </p>
                          {(paymentError.code || paymentError.reason) && (
                            <p className="mt-1 text-[12.5px] text-ink-600">
                              {paymentError.code && (
                                <code className="font-mono px-1.5 py-0.5 rounded bg-white border border-ink-100 text-[11.5px] mr-1">
                                  {paymentError.code}
                                </code>
                              )}
                              {paymentError.reason}
                            </p>
                          )}
                          <p className="mt-2 text-[12.5px] text-ink-600">
                            Try a different card / UPI ID, or write to{' '}
                            <a
                              href="mailto:innohealthbysush@gmail.com"
                              className="text-brand-700 font-semibold underline-offset-2 hover:underline"
                            >
                              innohealthbysush@gmail.com
                            </a>{' '}
                            and we'll send you a direct payment link.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    'group relative w-full inline-flex items-center justify-center gap-2.5',
                    'rounded-full font-semibold tracking-tight whitespace-nowrap',
                    'bg-brand-600 hover:bg-brand-700 text-white',
                    'shadow-elev hover:shadow-glow',
                    'transition-all duration-500 ease-out hover:-translate-y-0.5',
                    'px-6 py-4 text-base',
                    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30',
                    'overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0',
                  )}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background:
                        'radial-gradient(80% 100% at 50% 0%, rgba(255,255,255,.30), transparent 70%)',
                    }}
                  />
                  {submitting ? (
                    <>
                      <span className="relative w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span className="relative">
                        {isFreeAfterCoupon ? 'Confirming…' : 'Opening secure payment…'}
                      </span>
                    </>
                  ) : isFreeAfterCoupon ? (
                    <>
                      <Calendar className="w-[18px] h-[18px]" />
                      <span className="relative">Continue to book my slot · Free</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-[18px] h-[18px]" />
                      <span className="relative">
                        Pay {formatINR(payable)} securely
                      </span>
                    </>
                  )}
                </button>

                <p className="text-center text-[12.5px] text-ink-500 leading-relaxed">
                  <Lock className="w-3 h-3 inline-block -translate-y-0.5 mr-1 text-brand-600" />
                  256-bit SSL · PCI-DSS gateway · Full money-back if the call doesn't
                  deliver clarity.
                </p>
              </form>
            </motion.div>

            {/* RIGHT — Order Summary
                Mobile: collapsible accordion (closed by default) so the form is
                immediately visible on entering the page. Desktop: standard
                sticky right panel. */}
            <motion.aside
              variants={fadeUp}
              className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-6 lg:space-y-4"
            >
              {/* Mobile-only summary header / toggle */}
              <button
                type="button"
                onClick={() => setSummaryOpen((o) => !o)}
                aria-expanded={summaryOpen}
                aria-controls="checkout-order-body"
                className={cn(
                  'lg:hidden w-full flex items-center gap-3 rounded-2xl bg-white border border-ink-100 shadow-soft',
                  'px-4 py-3 text-left transition-all duration-300',
                  'hover:border-brand-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20',
                  summaryOpen && 'border-brand-200 shadow-elev',
                )}
              >
                <span className="icon-tile w-10 h-10 rounded-xl shrink-0">
                  <Sparkles className="w-4 h-4" strokeWidth={2} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[10.5px] uppercase tracking-[0.18em] font-semibold text-brand-700">
                    Your order · 1:1 Clarity Call
                  </span>
                  <span className="mt-0.5 flex items-baseline gap-2 leading-tight">
                    <span className="font-display text-lg font-semibold text-ink-950">
                      {formatINR(payable)}
                    </span>
                    {payable !== basePrice && (
                      <span className="text-[12px] line-through text-ink-400 font-medium">
                        {OFFER.fullPriceLabel}
                      </span>
                    )}
                    <span className="chip-success !py-0 !px-2 !text-[10.5px]">
                      {summaryOpen ? 'Hide details' : 'View details'}
                    </span>
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-ink-500 transition-transform duration-300 shrink-0',
                    summaryOpen && 'rotate-180',
                  )}
                />
              </button>

              {/* Body — collapsible on mobile via CSS grid trick; always on desktop */}
              <div
                id="checkout-order-body"
                className={cn(
                  'grid transition-[grid-template-rows,margin,opacity] duration-500 ease-out',
                  'lg:!grid-rows-[1fr] lg:!opacity-100 lg:!mt-0',
                  summaryOpen
                    ? 'grid-rows-[1fr] opacity-100 mt-3'
                    : 'grid-rows-[0fr] opacity-0 mt-0',
                )}
              >
                <div className="overflow-hidden lg:overflow-visible">
                  <div className="lg:space-y-4">
                    {/* Coupon card — desktop only here (mobile copy lives
                        above the form). */}
                    <CouponCard
                      coupon={coupon}
                      setCoupon={setCoupon}
                      applyCoupon={applyCoupon}
                      clearCoupon={clearCoupon}
                      className="hidden lg:block"
                    />

                    {/* Order summary */}
              <div className="relative rounded-[28px] overflow-hidden shadow-elev border border-white/60">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(160deg, #391218 0%, #5d2129 38%, #963543 100%)',
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      'radial-gradient(60% 50% at 30% 0%, rgba(236,158,169,.5) 0%, transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(255,202,74,.2) 0%, transparent 60%)',
                  }}
                />
                <div className="relative p-6 sm:p-7 text-cream">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] uppercase tracking-[0.22em] font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-brand-200" />
                    Your order
                  </div>

                  <div className="mt-5 flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-brand-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-lg sm:text-xl font-semibold leading-tight">
                        1:1 Clarity Call
                      </div>
                      <div className="text-sm text-cream/70 mt-0.5">
                        30-min clinical consultation · UK-trained nutritionist
                      </div>
                    </div>
                  </div>

                  <div className="my-5 h-px bg-white/10" />

                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-cream/80">Subtotal</span>
                      <span className="text-cream/85 font-medium">
                        {formatINR(basePrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cream/70">Real value</span>
                      <span className="text-cream/70 line-through">
                        {OFFER.fullPriceLabel}
                      </span>
                    </div>
                    {coupon.applied && discountAmount > 0 && (
                      <div className="flex items-center justify-between text-brand-200">
                        <span>Coupon · {coupon.code}</span>
                        <span className="font-semibold">
                          - {formatINR(discountAmount)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="my-5 h-px bg-white/10" />

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cream/60">
                        You pay today
                      </div>
                      <div className="font-display text-4xl sm:text-5xl font-semibold leading-none mt-2">
                        {payable === 0 ? '₹0' : formatINR(payable)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 text-brand-300 text-[12px] font-semibold">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-brand-400 text-brand-400"
                          />
                        ))}
                      </div>
                      <div className="text-[12px] text-cream/60 mt-1">
                        4.9/5 · 100+ adults
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-white/8 border border-white/12 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-cream/65 mb-3">
                      <Clock className="w-3.5 h-3.5 text-brand-300" /> Offer ends in
                    </div>
                    <Countdown minutes={15} variant="dark" />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/8 border border-white/10">
                      <ShieldCheck className="w-4 h-4 text-brand-200" />
                      <span className="text-[12.5px] font-medium">Money-back</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/8 border border-white/10">
                      <Lock className="w-4 h-4 text-brand-200" />
                      <span className="text-[12.5px] font-medium">100% secure</span>
                    </div>
                  </div>
                </div>
              </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </Container>
      </main>

      <Footer hideCTA />
    </div>
  )
}

function Step({ active, label }: { active?: boolean; label: string }) {
  return (
    <li
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors',
        active
          ? 'bg-brand-50 text-brand-700 border border-brand-200/60'
          : 'bg-white border border-ink-100 text-ink-500',
      )}
    >
      {active && (
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inset-0 rounded-full bg-brand-600 animate-ping opacity-75" />
          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-brand-600" />
        </span>
      )}
      <span className="whitespace-nowrap">{label}</span>
    </li>
  )
}

function Sep() {
  return <span aria-hidden className="hidden sm:block w-4 h-px bg-ink-200" />
}

function Field({
  label,
  error,
  icon,
  children,
}: {
  label: string
  error?: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="field-label">
        {icon}
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-[12.5px] text-brand-700 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function PremiumSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(false)
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'input flex items-center justify-between text-left',
          !value && 'text-ink-400',
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-ink-500 transition-transform duration-300 shrink-0 ml-2',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 mt-2 w-full rounded-2xl bg-white border border-ink-100 shadow-elev overflow-hidden p-1"
          >
            {options.map((o) => (
              <li key={o}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full text-left px-3.5 py-2.5 rounded-xl text-[14.5px] transition-all duration-200',
                    'hover:bg-brand-50 hover:text-brand-800',
                    value === o
                      ? 'bg-brand-50 text-brand-800 font-semibold'
                      : 'text-ink-800',
                  )}
                >
                  {o}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function Checkbox({
  checked,
  onChange,
  children,
  error,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  children: React.ReactNode
  error?: string
}) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer select-none group">
        <span className="relative shrink-0 mt-0.5">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span
            className={cn(
              'inline-flex w-5 h-5 rounded-md border-2 items-center justify-center transition-all duration-300',
              checked
                ? 'bg-brand-600 border-brand-600 shadow-soft'
                : 'bg-white border-ink-300 group-hover:border-ink-500',
            )}
          >
            <AnimatePresence>
              {checked && (
                <motion.svg
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  viewBox="0 0 24 24"
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5 9-11" />
                </motion.svg>
              )}
            </AnimatePresence>
          </span>
        </span>
        <span className="text-[14px] text-ink-700 leading-relaxed">{children}</span>
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-[12.5px] text-brand-700 font-medium pl-8"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function CouponCard({
  coupon,
  setCoupon,
  applyCoupon,
  clearCoupon,
  className,
}: {
  coupon: CouponState
  setCoupon: (c: CouponState) => void
  applyCoupon: () => void
  clearCoupon: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative rounded-3xl bg-white border border-ink-100 shadow-soft p-5 sm:p-6',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="icon-tile w-10 h-10 rounded-xl">
            <Tag className="w-4 h-4" strokeWidth={2} />
          </span>
          <div>
            <div className="font-semibold text-ink-950 text-[14.5px] leading-tight">
              Have a coupon?
            </div>
            <div className="text-[12px] text-ink-600">
              Apply it before paying
            </div>
          </div>
        </div>
        {coupon.applied && (
          <button
            type="button"
            onClick={clearCoupon}
            className="text-[12px] font-semibold text-ink-500 hover:text-brand-700 transition-colors inline-flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Remove
          </button>
        )}
      </div>

      {coupon.applied ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-brand-200/60 surface-tint p-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" strokeWidth={3} />
            </span>
            <div className="min-w-0">
              <div className="font-semibold text-ink-950 text-[14px] truncate">
                {coupon.code}
              </div>
              <div className="text-[12px] text-brand-700 font-semibold">
                {coupon.discountPct}% discount applied
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            placeholder="e.g. TGOTEST2025"
            value={coupon.code}
            onChange={(e) =>
              setCoupon({
                code: e.target.value.toUpperCase(),
                applied: false,
                discountPct: 0,
                invalid: false,
              })
            }
            className={cn(
              'input flex-1 !py-3 uppercase tracking-wider',
              coupon.invalid && '!border-brand-400 !ring-2 !ring-brand-200',
            )}
          />
          <button
            type="button"
            onClick={applyCoupon}
            disabled={!coupon.code.trim()}
            className="px-5 py-3 rounded-2xl bg-ink-900 text-white font-semibold text-sm hover:bg-ink-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Apply
          </button>
        </div>
      )}
      {coupon.invalid && !coupon.applied && (
        <p className="mt-2 text-[12.5px] text-brand-700 font-medium">
          That code isn't valid. Try again, or skip — the offer is already a
          great deal.
        </p>
      )}
    </div>
  )
}
