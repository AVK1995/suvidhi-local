import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMagnetic } from '@/lib/hooks'
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
  const ref = useMagnetic<HTMLButtonElement>(0.14)
  const navigate = useNavigate()

  const sizeClass =
    size === 'xl'
      ? 'px-7 sm:px-8 py-4 sm:py-[18px] text-[16px] sm:text-[17px]'
      : size === 'lg'
      ? 'px-6 sm:px-7 py-3.5 sm:py-4 text-[15px] sm:text-base'
      : 'px-5 sm:px-6 py-3 sm:py-3.5 text-[14px] sm:text-[15px]'

  return (
    <motion.button
      ref={ref}
      onClick={() => navigate(to + utmQueryString())}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'magnet group relative inline-flex items-center justify-center gap-2.5',
        'rounded-full font-semibold tracking-tight whitespace-nowrap',
        'bg-brand-600 text-white hover:bg-brand-700',
        'shadow-elev hover:shadow-glow',
        'transition-[box-shadow,background-color,transform] duration-500 ease-out',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30',
        sizeClass,
        className,
      )}
    >
      {/* shimmer overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(80% 100% at 50% 0%, rgba(255,255,255,.30), transparent 70%)',
        }}
      />
      {/* subtle ring on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: '0 0 0 1px rgba(203,74,93,.22)' }}
      />
      <Calendar className="w-[18px] h-[18px] opacity-90" aria-hidden />
      <span className="relative">{label}</span>
      {showPrice && (
        <span className="hidden sm:inline-flex items-center gap-2 ml-1">
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
