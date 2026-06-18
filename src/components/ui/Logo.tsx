import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'light' | 'dark'
}

export function Logo({ className, variant = 'light' }: LogoProps) {
  const fg = variant === 'dark' ? 'text-cream' : 'text-ink-950'
  const accent = variant === 'dark' ? 'text-brand-300' : 'text-brand-600'

  return (
    <Link
      to="/"
      aria-label="Suvidhi — Home"
      className={cn('inline-flex items-center gap-2.5 group', fg, className)}
    >
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-soft">
        <span
          aria-hidden
          className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(60% 80% at 50% 0%, rgba(255,255,255,.4), transparent 70%)',
          }}
        />
        {/* Stylized leaf-pulse mark */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative">
          <path
            d="M12 3c4.5 4 7 7 7 11a7 7 0 1 1-14 0c0-4 2.5-7 7-11Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 14.5l2.2-2.2 1.6 1.6L15 11"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="font-display text-[20px] font-semibold tracking-tight">
          Suvidhi
        </span>
        <span className={cn('block text-[10px] font-semibold tracking-[0.22em] uppercase mt-0.5', accent)}>
          Clinical Nutrition
        </span>
      </span>
    </Link>
  )
}
