import LandingPage from '@/views/LandingPage'

// Server-rendered so the hero (and its LCP image) ship in the initial HTML
// instead of waiting for the client bundle to download + hydrate. LandingPage
// is a client component — all of its browser access lives in effects — so it
// pre-renders to HTML cleanly with no hydration mismatch.
export default function Page() {
  return <LandingPage />
}
