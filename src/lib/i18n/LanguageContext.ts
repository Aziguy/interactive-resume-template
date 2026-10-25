import { createContext } from 'react'
import type { LocalizedString, LocalizedStringArray } from '@/data/types'

export interface LanguageContextValue {
  language: string
  setLanguage: (lang: string) => void
  resolve: (ls: LocalizedString) => string
  resolveArray: (lsa: LocalizedStringArray) => string[]
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
