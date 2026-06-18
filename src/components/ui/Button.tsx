import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  iconRight?: ReactNode
  iconLeft?: ReactNode
  arrow?: boolean
  fullWidth?: boolean
  children: ReactNode
}

const sizeMap: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-[13px] gap-1.5',
  md: 'px-6 py-3.5 text-[15px]',
  lg: 'px-7 py-4 text-base',
  xl: 'px-8 py-[18px] text-[17px]',
}

const variantMap: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-elev hover:shadow-glow ' +
    'hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-brand-500/30',
  outline:
    'bg-white text-ink-900 border border-ink-200 hover:border-brand-500 ' +
    'hover:text-brand-700 hover:bg-brand-50/40 focus-visible:ring-brand-500/20',
  ghost: 'text-ink-900 hover:bg-ink-900/5 focus-visible:ring-ink-900/10',
  dark:
    'bg-ink-900 text-cream hover:bg-ink-950 shadow-elev hover:-translate-y-0.5 ' +
    'focus-visible:ring-ink-900/20',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    iconRight,
    iconLeft,
    arrow,
    fullWidth,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2',
        'rounded-full font-semibold tracking-tight overflow-hidden',
        'transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-4',
        'disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
        sizeMap[size],
        variantMap[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...(rest as Record<string, unknown>)}
    >
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(60% 100% at 50% 0%, rgba(255,255,255,.35), transparent 70%)',
          }}
        />
      )}
      {iconLeft && <span className="relative -ml-0.5">{iconLeft}</span>}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          className="relative w-[18px] h-[18px] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
      {iconRight && !arrow && <span className="relative">{iconRight}</span>}
    </motion.button>
  )
})
