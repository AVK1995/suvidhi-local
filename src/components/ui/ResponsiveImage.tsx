import { cn } from '@/lib/utils'

interface ResponsiveImageProps {
  /**
   * Base path WITHOUT size suffix. E.g. `/images/suvidhi/dsc00257.jpg`.
   * The component looks for siblings `*-sm.jpg` (640w) and `*-md.jpg` (960w)
   * to power the srcset.
   */
  src: string
  alt: string
  className?: string
  /** Width / height in CSS px — used to reserve space and prevent CLS. */
  width?: number
  height?: number
  /** Hint to the browser about viewport sizes — improves LCP. */
  sizes?: string
  /** "eager" for above-the-fold, "lazy" otherwise (default). */
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** object-position override e.g. "center 20%" */
  objectPosition?: string
}

function withSuffix(src: string, suffix: string): string {
  return src.replace(/(\.[a-z]+)$/i, `${suffix}$1`)
}

export function ResponsiveImage({
  src,
  alt,
  className,
  width,
  height,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px',
  loading = 'lazy',
  fetchPriority,
  objectPosition,
}: ResponsiveImageProps) {
  const sm = withSuffix(src, '-sm')
  const md = withSuffix(src, '-md')

  return (
    <img
      src={src}
      srcSet={`${sm} 640w, ${md} 960w, ${src} 1600w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      // @ts-expect-error — React 18 accepts fetchpriority attribute via DOM
      fetchpriority={fetchPriority}
      style={objectPosition ? { objectPosition } : undefined}
      className={cn('object-cover', className)}
    />
  )
}
