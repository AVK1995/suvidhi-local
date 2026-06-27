import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Sora, Inter_Tight, Pacifico } from 'next/font/google'
import '@/index.css'
import { Analytics } from './Analytics'

// Self-hosted via next/font — eliminates the render-blocking Google Fonts
// stylesheet (and its two preconnects). Each family is exposed as a CSS
// variable that index.css / tailwind reference. display:swap paints fallback
// text immediately so the font never blocks FCP/LCP.
const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sora',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter-tight',
})

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-pacifico',
})

export const metadata: Metadata = {
  title: "Suvidhi — The Postpartum Restore™ · Find Out Why You Haven't Recovered",
  description:
    "The Postpartum Restore™ is a 25-minute guided assessment that helps you find out exactly why your body hasn't fully recovered after baby — and what to do about it. By a UK-trained clinical nutritionist.",
  openGraph: {
    title: 'Suvidhi — The Postpartum Restore™',
    description:
      "Find out exactly why your body hasn't fully recovered after baby, and what to do about it, in just 25 minutes.",
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#CB4A5D',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${interTight.variable} ${pacifico.variable}`}>
      <head>
        {/* Preconnect only to the origins that fire on initial load (analytics
            scripts below). Razorpay / Calendly are connected on their own
            pages. Lighthouse flags >4 preconnects, so keep this list tight. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://connect.facebook.net" />
      </head>
      <body className="bg-cream text-ink-900 antialiased">
        <noscript>
          <p style={{ fontFamily: 'system-ui', padding: 24, maxWidth: 480, margin: '0 auto' }}>
            Suvidhi runs on a modern browser with JavaScript enabled. Please enable
            JavaScript and reload, or email us at innohealthbysush@gmail.com.
          </p>
        </noscript>
        <Analytics />
        {children}

        {/* Microsoft Clarity — session/heatmap analytics (project vi86v72ho2).
            lazyOnload defers it until the browser is idle so it never competes
            with the critical render path or inflates TBT. */}
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vi86v72ho2");`}
        </Script>

        {/* Google Analytics 4 — gtag.js (G-Q1RHVTJQJ7) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q1RHVTJQJ7"
          strategy="lazyOnload"
        />
        <Script id="ga4-gtag" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q1RHVTJQJ7');`}
        </Script>
      </body>
    </html>
  )
}
