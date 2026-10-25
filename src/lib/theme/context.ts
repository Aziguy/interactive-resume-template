import { createContext } from 'react'
import type { PresetName } from '@/types/resume'

export interface ThemeContextValue {
  isDark: boolean
  toggle: () => void
  preset: PresetName
  setPreset: (preset: PresetName) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
