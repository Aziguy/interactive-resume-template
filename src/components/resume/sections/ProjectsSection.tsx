import { ExternalLink, FolderGit2 } from 'lucide-react'
import { resumeConfig } from '@/config/resume'
import { GitHubIcon } from '@/components/ui/icons'
import { TechBadge } from '@/components/ui/TechBadge'
import { useI18n } from '@/lib/i18n'
import { Section } from '../Section'

export function ProjectsSection() {
  const { t, l } = useI18n()
  const projects = resumeConfig.projects ?? []
  if (projects.length === 0) return null

  return (
    <Section title={t.sections.projects} icon={FolderGit2}>
      <div className="space-y-5">
        {projects.map((project) => {
          const title = l(project.title)
          return (
            <article key={project.id} className="break-inside-avoid">
              <h3 className="flex items-center gap-2 font-semibold text-ink">
                {title}
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={title} className="text-accent">
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${title} (code)`} className="text-accent">
                    <GitHubIcon className="size-3.5" />
                  </a>
                )}
              </h3>
              <p className="mt-1 leading-relaxed text-ink/80">{l(project.description)}</p>
              {project.techs && project.techs.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.techs.map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
