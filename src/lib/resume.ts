import type { Localized, Period, ResumeConfig, SkillItem } from '../types/resume'
import type { Messages } from './i18n/messages'

export function localize<T>(value: Localized<T>, lang: string, fallback: string): T {
  return value[lang] ?? value[fallback] ?? (Object.values(value)[0] as T)
}

export function skillLabel(item: SkillItem, lang: string, fallback: string): string {
  return typeof item === 'string' ? item : localize(item, lang, fallback)
}

function parseDate(value: string): { year: number; month?: number } {
  const [year, month] = value.split('-').map(Number)
  return { year, month }
}

function formatDate(value: string, lang: string): string {
  const { year, month } = parseDate(value)
  if (!month) return String(year)
  const text = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric' }).format(
    new Date(year, month - 1, 1),
  )
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatPeriod(period: Period, lang: string, t: Messages): string {
  const start = period.start ? formatDate(period.start, lang) : ''
  if (!period.end) return start
  const end = period.end === 'present' ? t.date.present : formatDate(period.end, lang)
  return start ? `${start} - ${end}` : end
}

export function formatDuration(period: Period, t: Messages, now = new Date()): string | null {
  if (!period.start || !period.end) return null
  const start = parseDate(period.start)
  const end =
    period.end === 'present'
      ? { year: now.getFullYear(), month: now.getMonth() + 1 }
      : parseDate(period.end)
  if (!start.month || !end.month) return null

  const total = (end.year - start.year) * 12 + (end.month - start.month) + 1
  if (total <= 0) return null
  const years = Math.floor(total / 12)
  const months = total % 12
  const parts: string[] = []
  if (years) parts.push(`${years} ${years > 1 ? t.date.years : t.date.year}`)
  if (months) parts.push(`${months} ${months > 1 ? t.date.months : t.date.month}`)
  return parts.join(' ')
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
}

export function pdfFileName(config: ResumeConfig, lang: string): string {
  const pattern = config.pdf?.fileName ?? `CV_${slugify(config.personal.name)}_{lang}`
  return `${pattern.replace('{lang}', lang.toUpperCase())}.pdf`
}

export function generatedPdfPath(config: ResumeConfig, lang: string): string {
  return `/cv/${lang}/${pdfFileName(config, lang)}`
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}
