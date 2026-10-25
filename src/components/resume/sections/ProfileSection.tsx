import { UserRound } from 'lucide-react'
import { resumeConfig } from '@/config/resume'
import { useI18n } from '@/lib/i18n'
import { Section } from '../Section'

export function ProfileSection() {
  const { t, l } = useI18n()
  if (!resumeConfig.profile) return null

  return (
    <Section title={t.sections.profile} icon={UserRound}>
      <p className="text-[1.0625rem] leading-relaxed text-ink/85 print:text-base">{l(resumeConfig.profile)}</p>
    </Section>
  )
}
