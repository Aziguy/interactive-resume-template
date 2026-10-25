import { createContext } from 'react'
import type { Localized } from '@/types/resume'
import type { Messages } from './messages'

export interface I18nContextValue {
  lang: string
  setLang: (lang: string) => void
  t: Messages
  l: <T = string>(value: Localized<T>) => T
}

export const I18nContext = createContext<I18nContextValue | null>(null)
