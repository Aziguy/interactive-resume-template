import { getTechColor } from '@/data/tech-registry'
import { cn } from '@/lib/utils'

interface TechBadgeProps {
  label: string
  size?: 'sm' | 'md'
}

export function TechBadge({ label, size = 'sm' }: TechBadgeProps) {
  const color = getTechColor(label)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-ink/10 bg-ink/[0.03] font-medium text-ink/80',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-[0.8125rem]',
      )}
    >
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full bg-accent ring-1 ring-ink/10"
        style={color ? { backgroundColor: color } : undefined}
      />
      {label}
    </span>
  )
}
