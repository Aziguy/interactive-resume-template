import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { TechBadge } from '@/components/ui/TechBadge'
import { useI18n } from '@/lib/i18n'
import { formatDuration, formatPeriod } from '@/lib/resume'
import { cn } from '@/lib/utils'
import type { Experience } from '@/types/resume'

export function ExperienceItem({ experience: exp }: { experience: Experience }) {
  const { lang, t, l } = useI18n()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const duration = formatDuration(exp.period, t)
  const highlights = exp.highlights ? l(exp.highlights) : []
  const tasks = exp.details?.tasks ? l(exp.details.tasks) : []

  return (
    <article className="relative pl-6">
      <span aria-hidden="true" className="absolute top-2 bottom-0 left-[3px] w-px bg-ink/10" />
      <span aria-hidden="true" className="absolute top-1.5 left-0 size-[7px] rounded-full bg-accent ring-4 ring-surface" />

      <div className="break-inside-avoid break-after-avoid">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <h3 className="text-base font-semibold text-ink">{l(exp.role)}</h3>
          <p className="text-sm font-medium tabular-nums text-accent">
            {formatPeriod(exp.period, lang, t)}
            {duration && <span className="font-normal text-muted"> · {duration}</span>}
          </p>
        </div>

        <p className="mt-0.5 text-sm text-muted">
          <span className="font-semibold text-ink/80">{exp.company}</span>
          {exp.location && ` · ${l(exp.location)}`}
          {exp.contract && (
            <span className="ml-2 rounded bg-accent/10 px-1.5 py-px text-xs font-medium text-accent">
              {l(exp.contract)}
            </span>
          )}
        </p>
      </div>

      {exp.summary && <p className="mt-3 leading-relaxed text-ink/85">{l(exp.summary)}</p>}

      {highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {highlights.map((item) => (
            <li key={item} className="flex break-inside-avoid gap-2.5 leading-relaxed text-ink/85">
              <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent/70" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {exp.techs && exp.techs.length > 0 && (
        <div className="mt-3.5 flex break-inside-avoid flex-wrap gap-1.5">
          {exp.techs.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      )}

      {exp.details && (
        <div className="print:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            {open ? t.actions.showLess : t.actions.showMore}
            <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
          </button>
          <div
            id={panelId}
            className={cn(
              'grid transition-[grid-template-rows,opacity] duration-300',
              open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
            inert={!open}
          >
            <div className="overflow-hidden">
              <div className="mt-3 space-y-3 rounded-lg bg-ink/[0.03] p-4 text-sm leading-relaxed">
                {exp.details.context && (
                  <p>
                    <span className="font-semibold text-ink">{t.experience.context} </span>
                    <span className="text-ink/80">{l(exp.details.context)}</span>
                  </p>
                )}
                {tasks.length > 0 && (
                  <div>
                    <p className="font-semibold text-ink">{t.experience.tasks}</p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-ink/80 marker:text-accent">
                      {tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
