// Centralised access to runtime env variables.
// Anything not VITE_* prefixed is invisible to the client by design.

const env = import.meta.env

function str(key: string, fallback = ''): string {
  const raw = env[key as keyof ImportMetaEnv]
  return typeof raw === 'string' && raw.length > 0 ? raw : fallback
}

function num(key: string, fallback: number): number {
  const v = str(key)
  if (!v) return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

function bool(key: string, fallback = false): boolean {
  const v = str(key).toLowerCase()
  if (!v) return fallback
  return v === '1' || v === 'true' || v === 'yes'
}

export const BRAND = {
  name: str('VITE_BRAND_NAME', 'Suvidhi'),
  email: str('VITE_BRAND_EMAIL', 'innohealthbysush@gmail.com'),
  phone: str('VITE_BRAND_PHONE', '+919810880970'),
  phoneDisplay: str('VITE_BRAND_PHONE_DISPLAY', '+91 98108 80970'),
} as const

export const OFFER = {
  name: str('VITE_OFFER_NAME', '1:1 Clarity Call'),
  price: num('VITE_OFFER_PRICE_INR', 1),
  fullPrice: num('VITE_OFFER_FULL_PRICE_INR', 4996),
  currency: str('VITE_OFFER_CURRENCY', 'INR'),
  // For UI display — formatted with Indian numbering
  get priceLabel(): string {
    return `₹${this.price.toLocaleString('en-IN')}`
  },
  get fullPriceLabel(): string {
    return `₹${this.fullPrice.toLocaleString('en-IN')}`
  },
  get savingsLabel(): string {
    const diff = Math.max(0, this.fullPrice - this.price)
    return `₹${diff.toLocaleString('en-IN')}`
  },
  get discountPctLabel(): string {
    if (this.fullPrice <= 0) return ''
    const pct = Math.round(((this.fullPrice - this.price) / this.fullPrice) * 100)
    return `${pct}% off`
  },
} as const

// Itemised value-stack — the "Recap of Everything You Will Get" pricing.
// Every amount reads from env so the entire stack is editable without code.
// The `core` items are the included deliverables; `bonus` items are the free
// add-ons. Labels live here because they're product copy, not pricing.
export interface ValueItem {
  label: string
  amount: number
  kind: 'core' | 'bonus'
}

export const VALUE_STACK: readonly ValueItem[] = [
  { label: 'The Postpartum Restore™ 25-Minute Guided Assessment', amount: num('VITE_VALUE_ASSESSMENT', 5000), kind: 'core' },
  { label: 'The Postpartum Depletion Audit', amount: num('VITE_VALUE_DEPLETION_AUDIT', 1500), kind: 'core' },
  { label: 'The Metabolic Recovery Audit', amount: num('VITE_VALUE_METABOLIC_AUDIT', 1500), kind: 'core' },
  { label: 'The Supplement & Hair Recovery Audit', amount: num('VITE_VALUE_SUPPLEMENT_AUDIT', 1500), kind: 'core' },
  { label: 'The Neuro-Endocrine Reset Audit', amount: num('VITE_VALUE_NEURO_AUDIT', 1500), kind: 'core' },
  { label: '30-Minute Postpartum Assessment Call with Suvidhi', amount: num('VITE_VALUE_CALL', 2500), kind: 'bonus' },
  { label: 'Private Postpartum Mothers Community', amount: num('VITE_VALUE_COMMUNITY', 3000), kind: 'bonus' },
  { label: 'Monthly Group Coaching Sessions', amount: num('VITE_VALUE_COACHING', 4500), kind: 'bonus' },
] as const

export const VALUE_STACK_TOTAL = VALUE_STACK.reduce((sum, i) => sum + i.amount, 0)

export const COUPON = {
  code: str('VITE_TEST_COUPON_CODE', 'tgotest2025').toUpperCase(),
  discountPct: num('VITE_TEST_COUPON_DISCOUNT_PCT', 100),
} as const

export const RAZORPAY = {
  keyId: str('VITE_RAZORPAY_KEY_ID', ''),
  companyName: str('VITE_RAZORPAY_COMPANY_NAME', 'InnoHealth · Suvidhi'),
  themeColor: str('VITE_RAZORPAY_THEME_COLOR', '#CB4A5D'),
} as const

export const CALENDLY = {
  url: str('VITE_CALENDLY_URL', ''),
  hideGdpr: bool('VITE_CALENDLY_HIDE_GDPR', true),
  hideEventTypeDetails: bool('VITE_CALENDLY_HIDE_EVENT_TYPE_DETAILS', false),
} as const

export const META_PIXEL = {
  id: str('VITE_META_PIXEL_ID', ''),
  capiEndpoint: str('VITE_META_CAPI_ENDPOINT', ''),
  testEventCode: str('VITE_META_TEST_EVENT_CODE', ''),
} as const

export const PABBLY = {
  webhookUrl: str('VITE_PABBLY_WEBHOOK_URL', ''),
} as const

export const WHATSAPP = {
  communityUrl: str('VITE_WHATSAPP_COMMUNITY_URL', ''),
} as const

export const GA4 = {
  measurementId: str('VITE_GA4_MEASUREMENT_ID', ''),
} as const
