import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { fadeUp } from '@/lib/motion'

interface PolicyHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  lastUpdated?: string
}

export function PolicyHeader({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
}: PolicyHeaderProps) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-[50vh] blur-3xl opacity-60"
          style={{
            background:
              'radial-gradient(closest-side, rgba(236,158,169,.45), transparent 70%)',
          }}
        />
      </div>
      <Container className="relative pt-8 pb-10 sm:pt-12 sm:pb-12">
        {/* Back link — kept left-aligned for natural navigation affordance. */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-700 transition-colors group mb-6"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to home
        </Link>

        {/* Heading block — centered across all viewports. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          <div className="eyebrow">
            <FileText className="w-3 h-3" />
            {eyebrow}
          </div>
          <h1 className="h-display mt-5 text-balance">{title}</h1>
          {subtitle && (
            <p className="mt-5 text-ink-700 text-[16.5px] leading-relaxed text-pretty max-w-xl">
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <p className="mt-5 inline-flex items-center gap-2 text-[12.5px] uppercase tracking-[0.18em] font-semibold text-ink-500">
              Last updated · {lastUpdated}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
