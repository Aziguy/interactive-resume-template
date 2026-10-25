import { resumeConfig } from '@/config/resume'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()
  const { available, labels } = resumeConfig.i18n
  if (available.length <= 1) return null

  return (
    <div role="group" aria-label={t.actions.language} className="flex rounded-full bg-ink/5 p-0.5">
      {available.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={code === lang}
          className={cn(
            'cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors',
            code === lang ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink',
          )}
        >
          {labels?.[code] ?? code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
