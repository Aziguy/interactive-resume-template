import { useEffect, useState, type ReactNode } from 'react'
import { resumeConfig } from '@/config/resume'
import { readStorage, writeStorage } from '@/lib/storage'
import type { PresetName } from '@/types/resume'
import { ThemeContext } from './context'
import { THEME_STORAGE_KEY, THEME_STYLE_ID, themeCss } from './css'

function getInitialDark(): boolean {
  const stored = readStorage(THEME_STORAGE_KEY)
  if (stored) return stored === 'dark'
  const mode = resumeConfig.theme?.defaultMode ?? 'system'
  if (mode !== 'system') return mode === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyPreset(preset: PresetName) {
  let style = document.getElementById(THEME_STYLE_ID)
  if (!style) {
    style = document.createElement('style')
    style.id = THEME_STYLE_ID
    document.head.appendChild(style)
  }
  style.textContent = themeCss(resumeConfig, preset)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getInitialDark)
  const [preset, setPreset] = useState<PresetName>(resumeConfig.theme?.preset ?? 'azure')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    // Printing always uses the light palette.
    const beforePrint = () => root.classList.remove('dark')
    const afterPrint = () => root.classList.toggle('dark', isDark)
    window.addEventListener('beforeprint', beforePrint)
    window.addEventListener('afterprint', afterPrint)
    return () => {
      window.removeEventListener('beforeprint', beforePrint)
      window.removeEventListener('afterprint', afterPrint)
    }
  }, [isDark])

  useEffect(() => applyPreset(preset), [preset])

  const toggle = () => {
    setIsDark((prev) => {
      writeStorage(THEME_STORAGE_KEY, prev ? 'light' : 'dark')
      return !prev
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle, preset, setPreset }}>
      {children}
    </ThemeContext.Provider>
  )
}
