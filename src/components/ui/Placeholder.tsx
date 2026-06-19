import { Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlaceholderProps {
  /** Caption shown under the icon. */
  label?: string
  /** Tailwind aspect-ratio class. Always landscape by default. */
  ratio?: string
  /** Tailwind rounding class. */
  rounded?: string
  className?: string
  /** Render the play-button badge (for video/VSL slots). */
  showPlay?: boolean
}

/**
 * On-theme landscape image placeholder.
 *
 * Used everywhere a real photo / product mockup will eventually go. The brand
 * has asked that NO Suvidhi imagery ship yet, so every image slot across the
 * site renders this instead — always in landscape, on desktop, tablet and
 * mobile.
 */
export function Placeholder({
  label = 'Image placeholder',
  ratio = 'aspect-[16/9]',
  rounded = 'rounded-2xl',
  className,
  showPlay = false,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'relative w-full overflow-hidden border border-dashed border-brand-200',
        'bg-gradient-to-br from-brand-50 via-cream to-cream-dark',
        ratio,
        rounded,
        className,
      )}
    >
      {/* Subtle grid texture so the box reads as an intentional slot */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(203,74,93,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(203,74,93,.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-50"
        style={{
          background:
            'radial-gradient(closest-side, rgba(236,158,169,.55), transparent 70%)',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-brand-400">
        {showPlay ? (
          <span className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/80 border border-brand-200 shadow-soft">
            <span aria-hidden className="pulse-beacon" style={{ animationDuration: '2.4s' }} />
            {/* Play triangle */}
            <span className="ml-1 w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-brand-600" />
          </span>
        ) : (
          <ImageIcon className="w-7 h-7" strokeWidth={1.75} />
        )}
        <span className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-brand-500">
          {label}
        </span>
      </div>
    </div>
  )
}
