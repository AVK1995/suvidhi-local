import { useEffect, useRef, useState, type RefObject } from 'react'

export function useCountdown(targetMs: number): {
  minutes: string
  seconds: string
  expired: boolean
} {
  const [remaining, setRemaining] = useState(targetMs)

  useEffect(() => {
    if (remaining <= 0) return
    const t = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1000))
    }, 1000)
    return () => window.clearInterval(t)
  }, [remaining])

  const totalSeconds = Math.floor(remaining / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    expired: remaining <= 0,
  }
}

export function useMagnetic<T extends HTMLElement>(
  strength = 0.18,
): RefObject<T> {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return ref
}

export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

export function usePastHero(): boolean {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const handler = () => setPast(window.scrollY > window.innerHeight * 0.55)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return past
}

/**
 * Returns true once the user has scrolled near the bottom of the document
 * (within `offset` pixels of the bottom). Used to hide the sticky CTA when
 * the footer's primary button comes into view.
 */
export function useNearPageBottom(offset = 420): boolean {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const handler = () => {
      const remaining =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight)
      setNear(remaining < offset)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [offset])
  return near
}

/**
 * Returns true once the user has scrolled past `threshold` px. Once it flips
 * to true, it stays true for the rest of the session — used by the Book-a-call
 * sticky CTA which the user explicitly requested should not disappear after
 * appearing.
 */
export function useScrolledPastSticky(threshold = 280): boolean {
  const [past, setPast] = useState(false)
  useEffect(() => {
    if (past) return
    const handler = () => {
      if (window.scrollY > threshold) setPast(true)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold, past])
  return past
}
