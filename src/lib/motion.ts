import type { Variants } from 'framer-motion'

// Unified easing — same curve across the site
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_OUT_BACK: [number, number, number, number] = [0.34, 1.56, 0.64, 1]
export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_SOFT } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
})

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const

// Eye-catching "attention" loop shared by every primary CTA across the site —
// a quick pulse + shake burst, then a rest before repeating. Always pair with
// useReducedMotion() so users who opt out get a static button.
export const CTA_ATTENTION_ANIMATE = {
  scale: [1, 1.05, 1, 1.05, 1],
  rotate: [0, -1, 1, -1, 0],
}
export const CTA_ATTENTION_TRANSITION = {
  duration: 0.85,
  ease: 'easeInOut' as const,
  repeat: Infinity,
  repeatDelay: 1.3,
}
