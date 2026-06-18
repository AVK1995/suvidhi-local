/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAND_NAME: string
  readonly VITE_BRAND_EMAIL: string
  readonly VITE_BRAND_PHONE: string
  readonly VITE_BRAND_PHONE_DISPLAY: string

  readonly VITE_OFFER_NAME: string
  readonly VITE_OFFER_PRICE_INR: string
  readonly VITE_OFFER_FULL_PRICE_INR: string
  readonly VITE_OFFER_CURRENCY: string

  readonly VITE_TEST_COUPON_CODE: string
  readonly VITE_TEST_COUPON_DISCOUNT_PCT: string

  readonly VITE_RAZORPAY_KEY_ID: string
  readonly VITE_RAZORPAY_COMPANY_NAME: string
  readonly VITE_RAZORPAY_THEME_COLOR: string

  readonly VITE_CALENDLY_URL: string
  readonly VITE_CALENDLY_HIDE_GDPR: string
  readonly VITE_CALENDLY_HIDE_EVENT_TYPE_DETAILS: string

  readonly VITE_META_PIXEL_ID: string
  readonly VITE_META_CAPI_ENDPOINT: string
  readonly VITE_META_TEST_EVENT_CODE: string

  readonly VITE_PABBLY_WEBHOOK_URL: string
  readonly VITE_WHATSAPP_COMMUNITY_URL: string
  readonly VITE_GA4_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
