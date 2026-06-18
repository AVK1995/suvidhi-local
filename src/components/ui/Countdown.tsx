import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CountdownProps {
  minutes?: number
  className?: string
  variant?: 'light' | 'dark'
}

export function Countdown({
  minutes = 15,
  className,
  variant = 'light',
}: CountdownProps) {
  const [remaining, setRemaining] = useState(minutes * 60)

  useEffect(() => {
    if (remaining <= 0) return
    const t = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1))
    }, 1000)
    return () => window.clearInterval(t)
  }, [remaining])

  const m = Math.floor(remaining / 60)
    .toString()
    .padStart(2, '0')
  const s = (remaining % 60).toString().padStart(2, '0')

  const isDark = variant === 'dark'

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 font-mono w-full',
        isDark ? 'text-white' : 'text-ink-900',
        className,
      )}
    >
      <TimeBlock value={m} label="MIN" dark={isDark} />
      <span
        className={cn(
          'text-2xl font-bold animate-breathe',
          isDark ? 'text-white/60' : 'text-ink-400',
        )}
      >
        :
      </span>
      <TimeBlock value={s} label="SEC" dark={isDark} />
    </div>
  )
}

function TimeBlock({ value, label, dark }: { value: string; label: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'relative w-14 sm:w-[60px] h-14 sm:h-[60px] rounded-2xl overflow-hidden',
          'flex items-center justify-center font-semibold tabular-nums',
          dark
            ? 'bg-white/10 text-white border border-white/15 shadow-inner backdrop-blur-sm'
            : 'bg-gradient-to-b from-ink-900 to-ink-950 text-cream shadow-elev',
        )}
      >
        <span className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className={cn(
          'mt-1.5 text-[10px] font-semibold tracking-[0.18em]',
          dark ? 'text-white/55' : 'text-ink-500',
        )}
      >
        {label}
      </span>
    </div>
  )
}
