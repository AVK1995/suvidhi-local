import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { PrimaryCTA } from '@/components/ui/PrimaryCTA'
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motion'
import { OFFER } from '@/lib/config'

const policies = [
  { label: 'Refund Policy', to: '/refund-policy' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Use', to: '/terms-and-conditions' },
]

interface FooterProps {
  /** Hide the bottom CTA pill — useful on /checkout, /book-a-call, /thank-you. */
  hideCTA?: boolean
}

export function Footer({ hideCTA = false }: FooterProps) {
  return (
    <footer className="relative mt-16 sm:mt-20">
      {/* Top divider strip — rose */}
      <div className="h-1.5 w-full bg-brand-600" aria-hidden />

      <Container className="py-10 sm:py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="text-center space-y-8"
        >
          {/* Copyright + policy links */}
          <p className="text-[14px] sm:text-[15px] text-ink-600 leading-relaxed">
            Copyright © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-ink-800">Suvidhi</span>. All rights
            reserved.{' '}
            <span className="inline-flex flex-wrap items-center gap-x-2 justify-center mt-1.5 sm:mt-0">
              {policies.map((p, i) => (
                <span key={p.to} className="inline-flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden className="text-ink-300">
                      |
                    </span>
                  )}
                  <Link
                    href={p.to}
                    className="font-semibold text-brand-600 hover:text-brand-700 underline-offset-2 hover:underline transition-colors"
                  >
                    {p.label}
                  </Link>
                </span>
              ))}
            </span>
          </p>

          {/* Final CTA pill — hidden on checkout / book-a-call / thank-you */}
          {!hideCTA && (
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-4 pt-2"
            >
              <PrimaryCTA
                size="xl"
                label={`Get Instant Access · ${OFFER.priceLabel}`}
                showPrice={false}
                className="!px-7 sm:!px-10"
              />
              <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-5 text-[12px] sm:text-[12.5px] uppercase tracking-[0.18em] font-semibold text-ink-600">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  Offer expires in
                  <InlineMinSec minutes={15} />
                </span>
                <span aria-hidden className="hidden sm:block w-1 h-1 rounded-full bg-ink-300" />
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  100% Money-Back Guarantee
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </footer>
  )
}

function InlineMinSec({ minutes }: { minutes: number }) {
  const [s, setS] = useState(minutes * 60)
  useEffect(() => {
    if (s <= 0) return
    const t = window.setInterval(() => setS((x) => Math.max(0, x - 1)), 1000)
    return () => window.clearInterval(t)
  }, [s])
  const mm = Math.floor(s / 60).toString().padStart(2, '0')
  const ss = (s % 60).toString().padStart(2, '0')
  return (
    <span className="font-mono normal-case tracking-normal text-ink-900 font-bold ml-1">
      {mm}:{ss}
    </span>
  )
}
