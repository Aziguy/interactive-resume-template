import { Briefcase } from 'lucide-react'
import { resumeConfig } from '@/config/resume'
import { useI18n } from '@/lib/i18n'
import { ExperienceItem } from '../ExperienceItem'
import { Section } from '../Section'

export function ExperienceSection() {
  const { t } = useI18n()

  return (
    <Section title={t.sections.experience} icon={Briefcase}>
      <div className="space-y-8 print:space-y-6">
        {resumeConfig.experiences.map((exp) => (
          <ExperienceItem key={exp.id} experience={exp} />
        ))}
      </div>
    </Section>
  )
}
