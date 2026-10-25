import { lazy, Suspense, useEffect } from 'react'
import { LanguageProvider } from '@/lib/i18n'
import { ThemeProvider, useTheme } from '@/lib/theme'
import { Resume } from '@/components/Resume'
import { presets } from '@/data/presets'
import type { PresetName } from '@/data/types'
import { resumeConfig } from '@/data/resume-config'

const Agentation = lazy(() =>
  import('agentation').then((m) => ({ default: m.Agentation }))
)

/**
 * Sets document title and meta description at runtime.
 * JSON-LD structured data and noscript fallback are injected at build time
 * by the vite-plugin-resume-seo plugin.
 */
function SeoHead() {
  useEffect(() => {
    const { title, description } = resumeConfig.seo
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [])
  return null
}

function ThemeVarsInjector({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme()

  return (
    <>
      <style>{`
        :root {
          --resume-bg: ${colors.bg};
          --resume-bg-card: ${colors.bgCard};
          --resume-text: ${colors.text};
          --resume-text-secondary: ${colors.textSecondary};
          --resume-primary: ${colors.primary};
          --resume-primary-light: ${colors.primaryLight};
          --resume-sidebar-from: ${colors.sidebarLight};
          --resume-sidebar-to: ${colors.sidebarLightEnd};
        }
        .dark {
          --resume-bg: ${colors.bgDark};
          --resume-bg-card: ${colors.bgCardDark};
          --resume-text: ${colors.textDark};
          --resume-text-secondary: ${colors.textSecondaryDark};
          --resume-primary: ${colors.primaryDark};
          --resume-primary-light: ${colors.primaryLightDark};
          --resume-sidebar-from: ${colors.sidebarDark};
          --resume-sidebar-to: ${colors.sidebarDarkEnd};
        }
      `}</style>
      {children}
    </>
  )
}

function DevPresetSelector() {
  const { preset, setPreset } = useTheme()
  const presetNames = Object.keys(presets) as PresetName[]

  return (
    <div className="fixed top-4 left-4 z-50 hidden md:block">
      <select
        value={preset}
        onChange={(e) => setPreset(e.target.value as PresetName)}
        className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm cursor-pointer"
      >
        {presetNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SeoHead />
        <ThemeVarsInjector>
          <Resume />
        </ThemeVarsInjector>
      </LanguageProvider>
      {import.meta.env.DEV && (
        <>
          <DevPresetSelector />
          <Suspense>
            <Agentation />
          </Suspense>
        </>
      )}
    </ThemeProvider>
  )
}
