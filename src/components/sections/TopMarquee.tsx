import { Sparkles, ShieldCheck, Stethoscope, Sprout, Award, Heart } from 'lucide-react'

const items = [
  { icon: Stethoscope, text: 'UK-trained Clinical Nutritionist' },
  { icon: Sprout, text: 'Built for women 3-24 months postpartum' },
  { icon: ShieldCheck, text: '14-Day money-back guarantee' },
  { icon: Heart, text: 'Cleared ≠ fully recovered' },
  { icon: Award, text: '1000+ mothers · 4.9/5 rating' },
  { icon: Sparkles, text: 'Bonus 1:1 call · Audits · Community included' },
]

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="marquee-group py-2.5" aria-hidden={ariaHidden || undefined}>
      {items.map((it, i) => {
        const Icon = it.icon
        return (
          <div
            key={i}
            className="flex items-center gap-2.5 text-[12.5px] font-medium tracking-tight"
          >
            <Icon className="w-3.5 h-3.5 text-brand-300" aria-hidden />
            <span>{it.text}</span>
            <span className="w-1 h-1 rounded-full bg-cream/30 ml-6" aria-hidden />
          </div>
        )
      })}
    </div>
  )
}

export function TopMarquee() {
  return (
    <div className="relative z-40 w-full bg-ink-950 text-cream/90 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'linear-gradient(90deg, rgba(203,74,93,0) 0%, rgba(203,74,93,.4) 50%, rgba(203,74,93,0) 100%)',
        }}
      />
      <div className="relative mask-fade-x">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup ariaHidden />
        </div>
      </div>
    </div>
  )
}
