import { Heart } from 'lucide-react'
import { resumeConfig } from '@/config/resume'
import { Icon } from '@/components/ui/icons'
import { useI18n } from '@/lib/i18n'
import { Section } from '../Section'

export function InterestsSection() {
  const { t, l } = useI18n()
  const interests = resumeConfig.interests ?? []
  if (interests.length === 0) return null

  return (
    <Section title={t.sections.interests} icon={Heart}>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(3.75rem,1fr))] gap-x-2 gap-y-4">
        {interests.map((interest) => (
          <li key={l(interest.label)} className="flex flex-col items-center gap-1.5 text-center">
            <span className="grid size-11 place-items-center rounded-full border border-ink/15 text-primary">
              <Icon name={interest.icon} className="size-5" />
            </span>
            <span className="text-xs text-ink/80">{l(interest.label)}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
