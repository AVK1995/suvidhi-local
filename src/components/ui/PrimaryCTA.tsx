import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { OFFER } from '@/lib/config'
import { utmQueryString } from '@/lib/utm'

interface PrimaryCTAProps {
  className?: string
  label?: string
  price?: string
  oldPrice?: string
  size?: 'md' | 'lg' | 'xl'
  showPrice?: boolean
  to?: string
}

export function PrimaryCTA({
  className,
  label = 'Get Instant Access',
  price = OFFER.priceLabel,
  oldPrice = OFFER.fullPriceLabel,
  size = 'lg',
  showPrice = true,
  to = '/checkout',
}: PrimaryCTAProps) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  const sizeClass =
    size === 'xl'
      ? 'px-7 sm:px-8 py-4 sm:py-[18px] text-[16px] sm:text-[17px]'
      : size === 'lg'
      ? 'px-6 sm:px-7 py-3.5 sm:py-4 text-[15px] sm:text-base'
      : 'px-5 sm:px-6 py-3 sm:py-3.5 text-[14px] sm:text-[15px]'

  return (
    <motion.button
      onClick={() => router.push(to + utmQueryString())}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduce ? undefined : { scale: [1, 1.025, 1] }}
      transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden',
        'rounded-full font-semibold tracking-tight whitespace-nowrap',
        'bg-brand-600 text-white hover:bg-brand-700',
        'shadow-elev hover:shadow-glow',
        'transition-[box-shadow,background-color] duration-500 ease-out',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30',
        sizeClass,
        className,
      )}
    >
      {/* hover shine, left → right */}
      <motion.span
        aria-hidden
        initial={{ x: '-150%' }}
        animate={{ x: hovered ? '170%' : '-150%' }}
        transition={{ duration: hovered ? 0.9 : 0, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-12deg]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.3) 50%, transparent 100%)' }}
      />
      <Calendar className="relative w-[18px] h-[18px] opacity-90" aria-hidden />
      <span className="relative">{label}</span>
      {showPrice && (
        <span className="relative hidden sm:inline-flex items-center gap-2 ml-1">
          <span className="text-white/60 line-through text-sm font-medium">{oldPrice}</span>
          <span className="px-2 py-0.5 rounded-full bg-white/15 border border-white/15 text-white">
            {price}
          </span>
        </span>
      )}
      <ArrowRight
        className="relative w-[18px] h-[18px] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        aria-hidden
      />
    </motion.button>
  )
}
