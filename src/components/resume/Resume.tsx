import { resumeConfig } from '@/config/resume'
import { useI18n } from '@/lib/i18n'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Header } from './Header'
import { EducationSection } from './sections/EducationSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { InterestsSection } from './sections/InterestsSection'
import { LanguagesSection } from './sections/LanguagesSection'
import { ProfileSection } from './sections/ProfileSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { SkillsSection } from './sections/SkillsSection'

const REPO_URL = 'https://github.com/Aziguy/interactive-resume-template'

export function Resume() {
  const { t } = useI18n()
  const siteUrl = resumeConfig.seo?.url

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 sm:py-8 print:p-0">
      <Toolbar />

      <main className="mx-auto max-w-[66rem] animate-rise overflow-hidden rounded-2xl bg-surface shadow-xl shadow-ink/5 ring-1 ring-ink/5 print:max-w-none print:rounded-none print:shadow-none print:ring-0">
        <Header />

        <div className="grid gap-x-12 gap-y-10 px-6 pt-8 pb-10 sm:px-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] print:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] print:gap-x-10 print:pt-4 print:pb-2">
          <div className="space-y-10 print:space-y-8">
            <ProfileSection />
            <ExperienceSection />
            <ProjectsSection />
          </div>
          <aside className="space-y-10 print:space-y-8">
            <SkillsSection />
            <EducationSection />
            <LanguagesSection />
            <InterestsSection />
          </aside>
        </div>

        {siteUrl && (
          <p className="hidden px-10 pt-2 pb-6 text-xs text-muted print:block">
            {t.footer.online} <a href={siteUrl} className="text-accent">{siteUrl.replace(/^https?:\/\//, '')}</a>
          </p>
        )}
      </main>

      <footer className="mx-auto mt-6 max-w-[66rem] text-center text-xs text-muted print:hidden">
        {t.footer.madeWith}{' '}
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent">
          interactive-resume-template
        </a>
      </footer>
    </div>
  )
}
