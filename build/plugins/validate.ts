import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { ICON_NAMES } from '../../src/components/ui/icon-names'
import type { Period, ResumeConfig } from '../../src/types/resume'
import { PUBLIC_DIR, loadResumeConfig } from '../shared'

const DATE = /^\d{4}(-(0[1-9]|1[0-2]))?$/
const LANG_KEY = /^[a-z]{2,3}(-[A-Z]{2})?$/

function isLocalized(value: object, langs: string[]): value is Record<string, unknown> {
  const keys = Object.keys(value)
  return keys.length > 0 && keys.every((k) => LANG_KEY.test(k)) && keys.some((k) => langs.includes(k))
}

function missingTranslations(node: unknown, langs: string[], at: string, out: string[]) {
  if (!node || typeof node !== 'object') return
  if (!Array.isArray(node) && isLocalized(node, langs)) {
    const missing = langs.filter((lang) => !(lang in node))
    if (missing.length) out.push(`${at}: traduction manquante (${missing.join(', ')})`)
    return
  }
  for (const [key, value] of Object.entries(node)) missingTranslations(value, langs, `${at}.${key}`, out)
}

function checkPeriod(period: Period | undefined, at: string, out: string[]) {
  if (!period) return
  if (period.start && !DATE.test(period.start)) out.push(`${at}.start: format attendu YYYY ou YYYY-MM`)
  if (period.end && period.end !== 'present' && !DATE.test(period.end)) {
    out.push(`${at}.end: format attendu YYYY, YYYY-MM ou 'present'`)
  }
}

function checkUniqueIds(items: { id: string }[] | undefined, at: string, out: string[]) {
  const seen = new Set<string>()
  for (const { id } of items ?? []) {
    if (seen.has(id)) out.push(`${at}: id "${id}" en double`)
    seen.add(id)
  }
}

export function validate(config: ResumeConfig): string[] {
  const warnings: string[] = []
  const { personal, i18n } = config

  if (/jane\s+doe/i.test(personal.name)) {
    warnings.push("Données d'exemple (Jane Doe) détectées : personnalisez src/config/resume.ts")
  }
  if (!i18n.available.includes(i18n.default)) {
    warnings.push(`i18n.default "${i18n.default}" absent de i18n.available`)
  }

  missingTranslations({ ...config, i18n: undefined, labels: undefined }, i18n.available, 'config', warnings)

  config.experiences.forEach((exp, i) => checkPeriod(exp.period, `experiences[${i}].period`, warnings))
  config.education.forEach((edu, i) => checkPeriod(edu.period, `education[${i}].period`, warnings))
  checkUniqueIds(config.experiences, 'experiences', warnings)
  checkUniqueIds(config.education, 'education', warnings)
  checkUniqueIds(config.projects, 'projects', warnings)

  const icons = [...(personal.facts ?? []), ...(config.interests ?? [])].map((item) => item.icon)
  for (const icon of icons) {
    if (!(ICON_NAMES as readonly string[]).includes(icon)) warnings.push(`Icône inconnue "${icon}"`)
  }

  if (personal.photo && !fs.existsSync(path.join(PUBLIC_DIR, personal.photo))) {
    warnings.push(`Photo "${personal.photo}" introuvable dans public/`)
  }

  return warnings
}

/** Prints config warnings at build start. Never blocks the build. */
export function validatePlugin(): Plugin {
  return {
    name: 'resume-validate',
    async buildStart() {
      const warnings = validate(await loadResumeConfig())
      if (warnings.length === 0) return
      console.warn(`\n\x1b[33m[resume-validate] ${warnings.length} point(s) à vérifier :\x1b[0m`)
      for (const warning of warnings) console.warn(`  - ${warning}`)
      console.warn('')
    },
  }
}
