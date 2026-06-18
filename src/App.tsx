import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { captureUtm } from './lib/utm'
import { initMetaPixel, pixelTrack } from './lib/tracking'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const BookACallPage = lazy(() => import('./pages/BookACallPage'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const RefundPage = lazy(() => import('./pages/RefundPage'))

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex items-center gap-3 text-ink-700">
        <span className="w-4 h-4 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
        <span className="text-sm font-medium">Loading…</span>
      </div>
    </div>
  )
}

// Captures UTM params on first paint and re-captures on every route change.
// Also fires a Pixel PageView per route.
function GlobalEffects() {
  const location = useLocation()
  useEffect(() => {
    initMetaPixel()
  }, [])
  useEffect(() => {
    captureUtm()
    pixelTrack('PageView')
  }, [location.pathname, location.search])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalEffects />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/book-a-call" element={<BookACallPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/refund-policy" element={<RefundPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
