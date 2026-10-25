import { Resume } from '@/components/resume/Resume'
import { presets } from '@/data/presets'
import { I18nProvider } from '@/lib/i18n'
import { ThemeProvider, useTheme } from '@/lib/theme'
import type { PresetName } from '@/types/resume'

function DevPresetSelector() {
  const { preset, setPreset } = useTheme()

  return (
    <select
      value={preset}
      onChange={(e) => setPreset(e.target.value as PresetName)}
      aria-label="Preset"
      className="fixed bottom-4 left-4 z-50 rounded-md border border-ink/15 bg-surface px-2 py-1 text-xs text-ink shadow print:hidden"
    >
      {Object.keys(presets).map((name) => (
        <option key={name}>{name}</option>
      ))}
    </select>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Resume />
        {import.meta.env.DEV && <DevPresetSelector />}
      </I18nProvider>
    </ThemeProvider>
  )
}
