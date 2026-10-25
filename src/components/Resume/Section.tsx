import { useId, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface SectionProps {
  title: string
  icon: LucideIcon
  children: ReactNode
}

export function Section({ title, icon: IconComponent, children }: SectionProps) {
  const id = useId()

  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-5 flex items-center gap-3 break-after-avoid">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-surface">
          <IconComponent className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.14em] text-ink">{title}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
      </h2>
      {children}
    </section>
  )
}
