import { LanguageSwitch } from './LanguageSwitch'
import { PdfButton } from './PdfButton'
import { ThemeToggle } from './ThemeToggle'

export function Toolbar() {
  return (
    <nav className="sticky top-3 z-20 mx-auto mb-5 flex max-w-[66rem] justify-end print:hidden">
      <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-surface/85 p-1.5 shadow-lg shadow-ink/5 backdrop-blur">
        <LanguageSwitch />
        <ThemeToggle />
        <PdfButton />
      </div>
    </nav>
  )
}
