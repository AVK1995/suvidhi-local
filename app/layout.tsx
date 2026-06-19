import type { Metadata, Viewport } from 'next'
import '@/index.css'
import { Analytics } from './Analytics'

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
    <html lang="en">
      <head>
        {/* Preconnects for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://checkout.razorpay.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://calendly.com" />
        {/* Fonts: Pacifico (script accent) + Poppins (headings) + Inter (body).
            display=swap renders fallback text immediately. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
        />
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
      </body>
    </html>
  )
}
