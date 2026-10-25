import { useState, useEffect, type ReactNode } from 'react'
import { resumeConfig } from '@/data/resume-config'
import { presets } from '@/data/presets'
import type { ThemeColors, PresetName } from '@/data/types'
import { ThemeContext } from './ThemeContext'

function getTimeBasedTheme(): 'light' | 'dark' {
  const now = new Date()
  const hour = now.getHours()
  const month = now.getMonth() // 0 = Jan, 11 = Dec

  // Evening threshold by month (approximate sunset in France)
  // Jan:18 Feb:18 Mar:19 Apr:20 May:21 Jun:21 Jul:21 Aug:20 Sep:19 Oct:19 Nov:18 Dec:18
  const eveningThresholds = [18, 18, 19, 20, 21, 21, 21, 20, 19, 19, 18, 18]
  // Morning threshold by month
  // Jan:8 Feb:8 Mar:7 Apr:7 May:6 Jun:6 Jul:6 Aug:7 Sep:7 Oct:7 Nov:8 Dec:8
  const morningThresholds = [8, 8, 7, 7, 6, 6, 6, 7, 7, 7, 8, 8]

  return hour >= eveningThresholds[month] || hour < morningThresholds[month] ? 'dark' : 'light'
}

function getInitialDark(): boolean {
  const stored = localStorage.getItem('resume-theme')
  if (stored === 'dark') return true
  if (stored === 'light') return false

  const mode = resumeConfig.theme?.defaultMode
  if (mode === 'dark') return true
  if (mode === 'light') return false
  if (mode === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches

  // Default: time-based
  return getTimeBasedTheme() === 'dark'
}

function resolveColors(presetName: PresetName): ThemeColors {
  const base = presets[presetName]
  const overrides = resumeConfig.theme?.colors
  return { ...base, ...overrides }
}

const defaultPreset: PresetName = resumeConfig.theme?.preset ?? 'minimal'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getInitialDark)
  const [preset, setPreset] = useState<PresetName>(defaultPreset)
  const colors = resolveColors(preset)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
  }, [isDark])

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem('resume-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle, colors, preset, setPreset }}>
      {children}
    </ThemeContext.Provider>
  )
}
