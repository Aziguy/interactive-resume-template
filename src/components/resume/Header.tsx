import { BadgeCheck } from 'lucide-react'
import { resumeConfig } from '@/config/resume'
import { Icon } from '@/components/ui/icons'
import { useI18n } from '@/lib/i18n'
import { Avatar } from './Avatar'
import { ContactList } from './ContactList'

export function Header() {
  const { l } = useI18n()
  const { personal, contact } = resumeConfig

  return (
    <header className="bg-header px-6 pt-10 pb-14 text-header-ink [clip-path:polygon(0_0,100%_0,100%_calc(100%-2rem),0_100%)] sm:px-10 print:pt-9 print:pb-12">
      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between print:flex-row print:items-center print:justify-between">
        <div className="min-w-0">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl print:text-[2.75rem]">{personal.name}</h1>
          <p className="mt-2 text-lg font-medium text-header-ink/90 sm:text-xl">{l(personal.title)}</p>
          {personal.headline && (
            <p className="mt-2 flex items-start gap-2 text-sm text-header-ink/70">
              <BadgeCheck className="mt-0.5 size-4 shrink-0 text-header-accent" aria-hidden="true" />
              {l(personal.headline)}
            </p>
          )}
        </div>
        <Avatar name={personal.name} photo={personal.photo} />
      </div>

      {personal.facts && personal.facts.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {personal.facts.map((fact) => (
            <li
              key={fact.icon + l(fact.label)}
              className="inline-flex items-center gap-2 rounded-full bg-header-ink/[0.08] px-3 py-1 text-sm text-header-ink/90"
            >
              <Icon name={fact.icon} className="size-4 text-header-accent" />
              {l(fact.label)}
            </li>
          ))}
        </ul>
      )}

      {personal.availability && (
        <p className="mt-5 flex items-center gap-2.5 text-lg font-semibold text-header-accent">
          <span aria-hidden="true" className="relative flex size-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-header-accent/60" />
            <span className="relative size-2.5 rounded-full bg-header-accent" />
          </span>
          {l(personal.availability)}
        </p>
      )}

      <div className="mt-6 border-t border-header-ink/10 pt-5">
        <ContactList items={contact} />
      </div>
    </header>
  )
}
