import type { TechName } from '../data/tech-registry'
import type { IconName } from '../components/ui/icon-names'
import type { Messages } from '../lib/i18n/messages'

/** Text per language code: `{ fr: '...', en: '...' }`. */
export type Localized<T = string> = Record<string, T>

/** `YYYY` or `YYYY-MM`. */
export type DateValue = `${number}` | `${number}-${number}`

export interface Period {
  start?: DateValue
  /** `present` for an ongoing position. Omit for a single date. */
  end?: DateValue | 'present'
}

export type ContactType = 'email' | 'phone' | 'location' | 'linkedin' | 'github' | 'website'

export interface Contact {
  type: ContactType
  label: string
  href?: string
}

export type Tech = TechName | (string & {})

export type SkillItem = Tech | Localized

export interface SkillGroup {
  title?: Localized
  items: SkillItem[]
}

export interface Fact {
  icon: IconName
  label: Localized
  /** Turns the chip into a link (e.g. a Credly profile). */
  href?: string
}

export interface Experience {
  id: string
  role: Localized
  company: string
  location?: Localized
  contract?: Localized
  period: Period
  summary?: Localized
  highlights?: Localized<string[]>
  techs?: Tech[]
  /** Shown when the entry is expanded (hidden in the PDF). */
  details?: {
    context?: Localized
    tasks?: Localized<string[]>
  }
}

export interface Education {
  id: string
  kind?: 'degree' | 'certification'
  title: Localized
  school: string
  period?: Period
  description?: Localized
  url?: string
}

export interface Project {
  id: string
  title: Localized
  description: Localized
  techs?: Tech[]
  url?: string
  repo?: string
}

export interface SpokenLanguage {
  name: Localized
  level: Localized
  /** 1 to 5, drawn as a meter. */
  score?: 1 | 2 | 3 | 4 | 5
}

export interface Interest {
  icon: IconName
  label: Localized
}

export type PresetName = 'azure' | 'minimal' | 'warm' | 'ocean' | 'forest' | 'slate' | 'lilac'

export interface Palette {
  bg: string
  surface: string
  text: string
  muted: string
  primary: string
  accent: string
  header: string
  headerText: string
  headerAccent: string
}

export interface ThemePreset {
  light: Palette
  dark: Palette
}

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }

export interface ResumeConfig {
  i18n: {
    default: string
    available: string[]
    /** Button labels, e.g. `{ fr: 'FR', en: 'EN' }`. */
    labels?: Record<string, string>
  }
  personal: {
    name: string
    title: Localized
    /** Certifications or tagline under the title. */
    headline?: Localized
    /** Highlighted line, e.g. availability. */
    availability?: Localized
    location?: string
    /** Path in `public/`. Auto-detected from `public/images/` when omitted. */
    photo?: string
    facts?: Fact[]
  }
  contact: Contact[]
  profile?: Localized
  experiences: Experience[]
  education: Education[]
  skills: SkillGroup[]
  languages?: SpokenLanguage[]
  interests?: Interest[]
  projects?: Project[]
  seo?: {
    title?: string
    description?: string
    /** Public URL of the deployed resume (canonical, Open Graph, PDF footer). */
    url?: string
  }
  pdf?: {
    /** Generate one PDF per language at build time. Default: true. */
    enabled?: boolean
    /** Without extension. `{lang}` is replaced by the language code. */
    fileName?: string
  }
  theme?: {
    preset?: PresetName
    light?: Partial<Palette>
    dark?: Partial<Palette>
    defaultMode?: 'light' | 'dark' | 'system'
  }
  /** Override built-in UI texts per language. */
  labels?: Localized<DeepPartial<Messages>>
}
