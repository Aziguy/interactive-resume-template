import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { resumeConfig } from '@/config/resume'
import { localize } from '@/lib/resume'
import { readStorage, writeStorage } from '@/lib/storage'
import type { Localized } from '@/types/resume'
import { I18nContext } from './context'
import { getMessages } from './messages'

const STORAGE_KEY = 'resume-language'
const { available, default: fallback } = resumeConfig.i18n

const isAvailable = (lang: string | null): lang is string => !!lang && available.includes(lang)

function getInitialLang(): string {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isAvailable(fromUrl)) return fromUrl
  const stored = readStorage(STORAGE_KEY)
  if (isAvailable(stored)) return stored
  const browser = navigator.language.split('-')[0]
  return isAvailable(browser) ? browser : fallback
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
  }, [lang])

  const setLang = useCallback((next: string) => {
    if (!isAvailable(next)) return
    writeStorage(STORAGE_KEY, next)
    setLangState(next)
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: getMessages(lang, resumeConfig.labels),
      l: <T,>(v: Localized<T>) => localize(v, lang, fallback),
    }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
