import { createContext } from 'react'
import type { ThemeColors, PresetName } from '@/data/types'

export interface ThemeContextValue {
  isDark: boolean
  toggle: () => void
  colors: ThemeColors
  preset: PresetName
  setPreset: (preset: PresetName) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
