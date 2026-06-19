import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { utmQueryString } from '@/lib/utm'

interface GradientCTAProps {
  label?: string
  subLabel?: string
  to?: string
  className?: string
}

/** Brand rose-gradient CTA: continuous pop loop + left→right shine on hover. */
export function GradientCTA({
  label = 'Get Instant Access!',
  subLabel = '100% Money-Back Guarantee',
  to = '/checkout',
  className,
}: GradientCTAProps) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      onClick={() => navigate(to + utmQueryString())}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduce ? undefined : { scale: [1, 1.025, 1] }}
      transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group relative overflow-hidden rounded-full px-6 py-4 sm:py-[18px] text-white shadow-elev hover:shadow-glow transition-shadow duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30',
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, #de6976 0%, #CB4A5D 50%, #963543 100%)' }}
      />
      {/* hover shine, left → right */}
      <motion.span
        aria-hidden
        initial={{ x: '-150%' }}
        animate={{ x: hovered ? '170%' : '-150%' }}
        transition={{ duration: hovered ? 0.9 : 0, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-12deg]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.45) 50%, transparent 100%)' }}
      />
      <span className="relative flex flex-col items-center leading-tight">
        <span className="inline-flex items-center gap-2 font-display text-lg sm:text-xl font-semibold tracking-tight">
          {label}
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
        {subLabel && (
          <span className="mt-0.5 text-[12px] font-medium text-white/85">{subLabel}</span>
        )}
      </span>
    </motion.button>
  )
}
