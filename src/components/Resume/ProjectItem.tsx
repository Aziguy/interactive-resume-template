import { TechBadge } from './TechBadge'
import { GitHubIcon, ExternalLinkIcon } from '@/components/icons'

interface ProjectItemProps {
  title: string
  description: string
  techs: string[]
  url?: string
  github?: string
}

export function ProjectItem({ title, description, techs, url, github }: ProjectItemProps) {
  return (
    <div className="py-3 px-3 -mx-3 rounded-lg hover:bg-resume-primary/5 transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-resume-text">{title}</h3>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title}`}>
            <ExternalLinkIcon className="w-3.5 h-3.5 text-resume-primary" />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub`}>
            <GitHubIcon className="w-3.5 h-3.5 text-resume-primary" />
          </a>
        )}
      </div>
      <p className="text-xs text-resume-text-secondary mb-2">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {techs.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>
    </div>
  )
}
