import { Award, GraduationCap } from 'lucide-react'
import { resumeConfig } from '@/config/resume'
import { useI18n } from '@/lib/i18n'
import { formatPeriod } from '@/lib/resume'
import { Section } from '../Section'

export function EducationSection() {
  const { lang, t, l } = useI18n()

  return (
    <Section title={t.sections.education} icon={GraduationCap}>
      <div className="space-y-5">
        {resumeConfig.education.map((edu) => {
          const KindIcon = edu.kind === 'certification' ? Award : GraduationCap
          const title = l(edu.title)
          return (
            <article key={edu.id} className="flex gap-3 break-inside-avoid">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                <KindIcon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold leading-snug text-ink">
                  {edu.url ? (
                    <a href={edu.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </h3>
                <p className="mt-0.5 text-sm text-muted">
                  <span className="font-medium text-ink/80">{edu.school}</span>
                  {edu.period && <span className="tabular-nums"> · {formatPeriod(edu.period, lang, t)}</span>}
                </p>
                {edu.description && <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{l(edu.description)}</p>}
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
