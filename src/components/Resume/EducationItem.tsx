import { assetUrl } from '@/lib/utils'

interface EducationItemProps {
  school: string
  degree: string
  specialty?: string
  period?: string
  logo?: string
}

export function EducationItem({ school, degree, specialty, period, logo }: EducationItemProps) {
  return (
    <div className="flex items-start gap-4">
      {logo && (
        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <img src={assetUrl(logo)} alt={`${school} logo`} className="object-contain w-full h-full" loading="lazy" />
        </div>
      )}
      <div>
        <p className="text-base font-semibold text-resume-text">{school}</p>
        <p className="text-sm text-resume-text-secondary">{degree}</p>
        {specialty && (
          <p className="text-sm text-resume-primary">{specialty}</p>
        )}
        {period && (
          <p className="text-xs text-resume-text-secondary mt-0.5">{period}</p>
        )}
      </div>
    </div>
  )
}
