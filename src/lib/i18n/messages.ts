const fr = {
  sections: {
    profile: 'Profil',
    experience: 'Expériences professionnelles',
    education: 'Formations & certifications',
    skills: 'Compétences',
    languages: 'Langues',
    interests: "Centres d'intérêt",
    projects: 'Projets',
  },
  actions: {
    downloadPdf: 'Télécharger le PDF',
    preparingPdf: 'Préparation...',
    toggleTheme: 'Basculer le thème clair / sombre',
    language: 'Langue',
    showMore: 'Voir le détail',
    showLess: 'Masquer le détail',
    copy: 'Copier',
    copied: 'Copié',
  },
  experience: {
    context: 'Contexte :',
    tasks: 'Missions',
  },
  date: {
    present: "Aujourd'hui",
    year: 'an',
    years: 'ans',
    month: 'mois',
    months: 'mois',
  },
  footer: {
    online: 'Version interactive :',
    madeWith: 'Propulsé par',
  },
}

export type Messages = typeof fr

const en: Messages = {
  sections: {
    profile: 'Profile',
    experience: 'Experience',
    education: 'Education & certifications',
    skills: 'Skills',
    languages: 'Languages',
    interests: 'Interests',
    projects: 'Projects',
  },
  actions: {
    downloadPdf: 'Download PDF',
    preparingPdf: 'Preparing...',
    toggleTheme: 'Toggle light / dark theme',
    language: 'Language',
    showMore: 'Show details',
    showLess: 'Hide details',
    copy: 'Copy',
    copied: 'Copied',
  },
  experience: {
    context: 'Context:',
    tasks: 'Responsibilities',
  },
  date: {
    present: 'Present',
    year: 'yr',
    years: 'yrs',
    month: 'mo',
    months: 'mos',
  },
  footer: {
    online: 'Interactive version:',
    madeWith: 'Powered by',
  },
}

export const builtInMessages: Record<string, Messages> = { fr, en }

type Overrides = { [key: string]: unknown }

function merge<T>(base: T, overrides?: Overrides): T {
  if (!overrides) return base
  const out = { ...base } as Overrides
  for (const [key, value] of Object.entries(overrides)) {
    out[key] =
      value && typeof value === 'object' && !Array.isArray(value)
        ? merge(out[key], value as Overrides)
        : value
  }
  return out as T
}

export function getMessages(lang: string, overrides?: Record<string, unknown>): Messages {
  const base = builtInMessages[lang] ?? builtInMessages.en
  return merge(base, overrides?.[lang] as Overrides | undefined)
}
