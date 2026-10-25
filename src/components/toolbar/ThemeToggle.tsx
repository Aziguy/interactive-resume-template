import { Moon, Sun } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  const { t } = useI18n()
  const IconComponent = isDark ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.actions.toggleTheme}
      title={t.actions.toggleTheme}
      className="grid size-9 cursor-pointer place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
    >
      <IconComponent className="size-[18px]" />
    </button>
  )
}
