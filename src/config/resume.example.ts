import type { ResumeConfig } from '../types/resume'

/**
 * Commented example. Copy the parts you need into resume.ts.
 * Localized fields take one entry per language listed in `i18n.available`.
 * Built-in UI texts exist for `fr` and `en`; other languages fall back to English (see `labels`).
 */
export const resumeConfig: ResumeConfig = {
  i18n: {
    default: 'en',
    available: ['en', 'fr'],
    labels: { en: 'EN', fr: 'FR' }, // Optional, defaults to the uppercased code.
  },

  personal: {
    name: 'Jane Doe',
    title: { en: 'Fullstack Developer', fr: 'Développeuse Fullstack' },
    headline: { en: 'AWS Certified · React · Node.js', fr: 'Certifiée AWS · React · Node.js' }, // Optional
    availability: { en: 'Open to new opportunities', fr: 'Ouverte aux opportunités' }, // Optional, highlighted
    location: 'Paris, France',
    // photo: '/images/me.jpg', // Optional. Any image in public/images/ is detected; initials otherwise.
    facts: [
      // Icons: see src/components/ui/icon-names.ts
      { icon: 'briefcase', label: { en: '6 years of experience', fr: "6 ans d'expérience" } },
      { icon: 'globe', label: { en: 'Remote friendly', fr: 'Télétravail possible' } },
    ],
  },

  contact: [
    // Types: email | phone | location | linkedin | github | website. Email and phone links are automatic.
    { type: 'email', label: 'jane@example.com' },
    { type: 'phone', label: '+33 6 12 34 56 78' },
    { type: 'linkedin', label: 'janedoe', href: 'https://linkedin.com/in/janedoe' },
    { type: 'github', label: 'janedoe', href: 'https://github.com/janedoe' },
    { type: 'location', label: 'Paris, France' },
  ],

  profile: {
    en: 'Fullstack developer focused on React and Node.js, building products used by thousands of people.',
    fr: 'Développeuse fullstack spécialisée React et Node.js, je construis des produits utilisés par des milliers de personnes.',
  },

  experiences: [
    {
      id: 'techcorp',
      role: { en: 'Senior Fullstack Developer', fr: 'Développeuse Fullstack Senior' },
      company: 'TechCorp',
      location: { en: 'Paris', fr: 'Paris' },
      contract: { en: 'Permanent', fr: 'CDI' }, // Optional badge
      period: { start: '2022-01', end: 'present' }, // YYYY or YYYY-MM, end: 'present' for ongoing
      summary: { en: 'SaaS platform used by 10k+ users.', fr: 'Plateforme SaaS utilisée par 10k+ utilisateurs.' },
      highlights: {
        // Always visible, printed in the PDF. Keep 3 to 4 short bullets.
        en: ['Designed the frontend architecture', 'Migrated 200+ files to TypeScript', 'Mentored 3 junior developers'],
        fr: ["Conception de l'architecture frontend", 'Migration de 200+ fichiers vers TypeScript', 'Mentorat de 3 développeurs juniors'],
      },
      techs: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'], // Brand colors from src/data/tech-registry.ts
      details: {
        // Optional, revealed on click, not printed.
        context: { en: 'Team of 8, two-week sprints.', fr: 'Équipe de 8, sprints de deux semaines.' },
        tasks: {
          en: ['Real-time notifications with WebSockets', 'RBAC across the platform'],
          fr: ['Notifications temps réel via WebSockets', 'RBAC sur toute la plateforme'],
        },
      },
    },
  ],

  education: [
    {
      id: 'master',
      kind: 'degree', // degree | certification (changes the icon)
      title: { en: 'Master in Computer Science', fr: 'Master Informatique' },
      school: 'University of Paris',
      period: { start: '2017', end: '2019' },
      description: { en: 'Web and mobile development.', fr: 'Développement web et mobile.' },
    },
  ],

  skills: [
    // Items: a tech name (string) or a localized label.
    { title: { en: 'Frontend', fr: 'Frontend' }, items: ['React', 'TypeScript', 'Tailwind CSS'] },
    { title: { en: 'Methods', fr: 'Méthodes' }, items: ['Scrum', { en: 'Code review', fr: 'Revue de code' }] },
  ],

  languages: [
    { name: { en: 'French', fr: 'Français' }, level: { en: 'Native', fr: 'Natif' }, score: 5 },
    { name: { en: 'English', fr: 'Anglais' }, level: { en: 'C1', fr: 'C1' }, score: 4 },
  ],

  interests: [
    { icon: 'camera', label: { en: 'Photography', fr: 'Photographie' } },
    { icon: 'mountain', label: { en: 'Hiking', fr: 'Randonnée' } },
  ],

  projects: [
    {
      id: 'weather',
      title: { en: 'WeatherApp', fr: 'WeatherApp' },
      description: { en: 'Real-time weather dashboard.', fr: 'Tableau de bord météo en temps réel.' },
      techs: ['React', 'TypeScript'],
      url: 'https://weather.example.com',
      repo: 'https://github.com/janedoe/weather-app',
    },
  ],

  seo: {
    title: 'Jane Doe · Fullstack Developer', // Defaults to "name · title"
    description: 'Interactive resume of Jane Doe, fullstack developer.',
    url: 'https://janedoe.github.io/interactive-resume-template/', // Canonical URL, printed in the PDF footer
  },

  pdf: {
    enabled: true, // Generates public PDFs at build time (default)
    fileName: 'CV_Jane_Doe_{lang}', // Default: CV_<Name>_<LANG>
  },

  theme: {
    preset: 'ocean', // azure | minimal | warm | ocean | forest | slate | lilac
    defaultMode: 'system', // light | dark | system
    // light: { accent: '#0b74b0' }, // Override any palette token
  },

  // labels: { en: { sections: { experience: 'Career' } } }, // Override built-in UI texts
}
