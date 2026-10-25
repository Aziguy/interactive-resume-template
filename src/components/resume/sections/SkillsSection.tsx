import { Wrench } from 'lucide-react'
import { resumeConfig } from '@/config/resume'
import { TechBadge } from '@/components/ui/TechBadge'
import { useI18n } from '@/lib/i18n'
import { Section } from '../Section'

export function SkillsSection() {
  const { t, l } = useI18n()

  return (
    <Section title={t.sections.skills} icon={Wrench}>
      <div className="space-y-4">
        {resumeConfig.skills.map((group, i) => (
          <div key={group.title ? l(group.title) : i} className="break-inside-avoid">
            {group.title && (
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{l(group.title)}</h3>
            )}
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => {
                const label = typeof item === 'string' ? item : l(item)
                return <TechBadge key={label} label={label} size="md" />
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
