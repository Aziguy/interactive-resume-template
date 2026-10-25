import { useState, useEffect, type ReactNode } from 'react'
import { resumeConfig } from '@/data/resume-config'
import type { LocalizedString, LocalizedStringArray } from '@/data/types'
import { LanguageContext } from './LanguageContext'

function getUrlLanguage(): string | null {
  const params = new URLSearchParams(window.location.search)
  const lang = params.get('lang')
  if (lang && resumeConfig.languages.available.includes(lang)) return lang
  return null
}

function detectBrowserLanguage(): string {
  const { available, default: defaultLang } = resumeConfig.languages
  const browserLang = navigator.language.split('-')[0]
  return available.includes(browserLang) ? browserLang : defaultLang
}

function updateUrlLanguage(lang: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('lang', lang)
  window.history.replaceState({}, '', url.toString())
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { default: defaultLang } = resumeConfig.languages

  const [language, setLanguageState] = useState(() => {
    // Priority: 1. URL param  2. localStorage  3. browser detection
    const urlLang = getUrlLanguage()
    if (urlLang) return urlLang

    const stored = localStorage.getItem('resume-language')
    if (stored && resumeConfig.languages.available.includes(stored)) return stored

    return detectBrowserLanguage()
  })

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem('resume-language', lang)
    updateUrlLanguage(lang)
  }

  useEffect(() => {
    document.documentElement.lang = language
    updateUrlLanguage(language)
  }, [language])

  const resolve = (ls: LocalizedString): string => {
    return ls[language] ?? ls[defaultLang] ?? Object.values(ls)[0] ?? ''
  }

  const resolveArray = (lsa: LocalizedStringArray): string[] => {
    return lsa[language] ?? lsa[defaultLang] ?? Object.values(lsa)[0] ?? []
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, resolve, resolveArray }}>
      {children}
    </LanguageContext.Provider>
  )
}
