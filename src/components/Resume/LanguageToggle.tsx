import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@/components/icons'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation()
  const { available, labels } = resumeConfig.languages
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (available.length <= 1) return null

  const handleSelect = (lang: string) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold tracking-wide bg-resume-primary/10 text-resume-primary hover:bg-resume-primary/20 transition-colors cursor-pointer"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        {labels[language]}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDownIcon className="w-3 h-3" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1 min-w-[4rem] rounded-lg bg-resume-bg-card border border-resume-primary/15 shadow-lg overflow-hidden z-50"
            role="listbox"
            aria-label="Language"
          >
            {available.map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => handleSelect(lang)}
                  role="option"
                  aria-selected={lang === language}
                  className={`w-full px-3 py-2 text-xs font-semibold tracking-wide text-left transition-colors cursor-pointer ${
                    lang === language
                      ? 'bg-resume-primary/15 text-resume-primary'
                      : 'text-resume-text-secondary hover:bg-resume-primary/5 hover:text-resume-primary'
                  }`}
                >
                  {labels[lang]}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
