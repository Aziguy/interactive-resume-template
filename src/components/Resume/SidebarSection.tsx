import { useId } from 'react'
import { cn } from '@/lib/utils'

interface SidebarSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  const titleId = useId()

  return (
    <section className={cn('mb-6', className)} aria-labelledby={titleId}>
      <h3
        id={titleId}
        className="text-xs font-bold tracking-widest text-resume-text mb-3 pb-1 border-b border-resume-primary/20"
      >
        {title}
      </h3>
      {children}
    </section>
  )
}
