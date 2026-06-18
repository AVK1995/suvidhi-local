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
