import { Languages } from 'lucide-react'
import { resumeConfig } from '@/config/resume'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Section } from '../Section'

export function LanguagesSection() {
  const { t, l } = useI18n()
  const languages = resumeConfig.languages ?? []
  if (languages.length === 0) return null

  return (
    <Section title={t.sections.languages} icon={Languages}>
      <ul className="space-y-2.5">
        {languages.map((language) => (
          <li key={l(language.name)} className="flex items-center justify-between gap-4">
            <span>
              <span className="font-medium text-ink">{l(language.name)}</span>
              <span className="text-sm text-muted"> · {l(language.level)}</span>
            </span>
            {language.score && (
              <span className="flex gap-1" role="img" aria-label={`${language.score}/5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={cn('size-2 rounded-full', n <= language.score! ? 'bg-accent' : 'bg-ink/10')}
                  />
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
