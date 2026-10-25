# Customization Guide

This guide walks you through the config file section by section.

## The Config File

Everything about your resume is defined in a single file: `src/data/resume-config.ts`.

This file exports a `resumeConfig` object with TypeScript types, so your editor will give you autocompletion and error checking.

A fully commented example is available in `src/data/resume-config.example.ts`.

## Multi-language Text

All text fields that need translation use the `LocalizedString` format:

```typescript
title: { en: 'Developer', fr: 'Developpeur', de: 'Entwickler' }
```

Add as many languages as you need. Just make sure each language code is also listed in `languages.available`.

## Sections

### Personal Info

```typescript
personal: {
  name: 'Jane Doe',
  photo: '/images/photo.jpg',      // Place in public/images/
  photoBackEmoji: '👩‍💻',            // Shown on photo flip
  title: { en: 'Developer', fr: 'Developpeur' },
  subtitle: { en: '5 years exp.', fr: '5 ans exp.' },
  location: 'Paris, France',
}
```

**Photo**: Place your photo in `public/images/`. Recommended size: 256x256px, square.

### Languages

```typescript
languages: {
  default: 'en',                   // Fallback language
  available: ['en', 'fr'],         // All supported languages
  labels: { en: 'EN', fr: 'FR' }, // Labels shown in the toggle
}
```

For a single language, set `available` to just one: `['en']`. The language toggle will be hidden.

### Contact

```typescript
contact: [
  { type: 'github', label: 'janedoe', href: 'https://github.com/janedoe' },
  { type: 'linkedin', label: 'Jane Doe', href: 'https://linkedin.com/in/janedoe' },
  { type: 'email', label: 'jane@example.com' },     // auto mailto:
  { type: 'phone', label: '+33 6 12 34 56 78' },    // auto tel:
  { type: 'location', label: 'Paris, France' },
  { type: 'website', label: 'janedoe.dev', href: 'https://janedoe.dev' },
]
```

Available types: `github`, `linkedin`, `email`, `phone`, `location`, `website`.

For `email` and `phone`, the link is auto-generated if you don't provide `href`.

### Skills

Three display types are available:

```typescript
skills: [
  {
    title: { en: 'Frontend' },
    type: 'badges',              // Colored tech badges
    items: [
      { name: 'React', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
    ],
  },
  {
    title: { en: 'Languages' },
    type: 'languages',           // Name + level
    items: [
      { name: 'French', level: { en: 'Native' } },
      { name: 'English', level: { en: 'Professional' }, details: 'TOEIC 910' },
    ],
  },
  {
    title: { en: 'DevOps' },
    type: 'text',                // Simple text list
    items: [
      { name: 'Docker, Kubernetes, AWS' },
    ],
  },
]
```

### Experiences

```typescript
experiences: [
  {
    id: 'company-a',               // Unique identifier
    company: { en: 'TechCorp' },
    role: { en: 'Senior Dev' },
    type: { en: 'Permanent' },     // Optional badge
    period: { en: '2022 - Present' },
    description: { en: 'Built a SaaS platform...' },
    techs: ['React', 'TypeScript'],
    isHighlighted: true,            // Visual emphasis (optional)
    details: {                      // Expandable content (optional)
      context: { en: 'Team of 8...' },
      tasks: { en: ['Led architecture', 'Mentored juniors'] },
      training: { en: ['React Advanced'] },  // Optional
      env: { en: 'React / TypeScript / AWS' },
    },
    subItem: {                      // Sub-entry (optional)
      title: { en: 'Side project' },
      description: { en: 'Built an internal tool' },
    },
  },
]
```

If `details` is provided, the experience becomes expandable (click to expand on desktop, opens modal on mobile).

### Projects (optional)

```typescript
projects: [
  {
    id: 'my-project',
    title: { en: 'WeatherApp' },
    description: { en: 'A weather dashboard...' },
    techs: ['React', 'TypeScript'],
    url: 'https://weather.example.com',     // Optional
    github: 'https://github.com/me/app',    // Optional
  },
]
```

Remove or leave empty to hide the section entirely.

### Education

```typescript
education: [
  {
    school: { en: 'University of Paris' },
    degree: { en: 'Master in CS' },
    specialty: { en: 'Web Development' },   // Optional
    period: '2017 - 2019',                  // Optional
    logo: '/images/school.png',             // Optional (place in public/images/)
  },
]
```

### Hobbies (optional)

```typescript
hobbies: [
  {
    title: { en: 'Photography' },
    details: [
      { en: 'Street photography' },
      { en: '5 years' },
    ],
  },
]
```

### PDF Download (optional)

Place your PDF files in `public/cv/` and add:

```typescript
// One PDF per language (recommended for multi-language resumes)
// The download button is hidden if no PDF exists for the current language
pdf: {
  label: { en: 'Download PDF', fr: 'Télécharger le PDF' },
  path: { en: '/cv/resume-en.pdf', fr: '/cv/resume-fr.pdf' },
}

// Or a single PDF for all languages
pdf: {
  label: { en: 'Download PDF', fr: 'Télécharger le PDF' },
  path: '/cv/resume.pdf',
}
```

Remove the `pdf` block entirely to hide the download button.

## Theme

### Using a Preset

```typescript
theme: {
  preset: 'warm',   // 'minimal' | 'warm'
}
```

Each preset includes dark-mode-optimized colors, so accents stay readable in both light and dark modes.

### Custom Colors

Override individual colors:

```typescript
theme: {
  preset: 'minimal',
  colors: {
    // Background & text (light)
    bg: '#faf6f1',
    bgCard: '#ffffff',
    text: '#2c1810',
    textSecondary: '#7a6455',
    // Background & text (dark)
    bgDark: '#1a1410',
    bgCardDark: '#261e17',
    textDark: '#f5ebe0',
    textSecondaryDark: '#b8a898',
    // Accent (light)
    primary: '#8B5A2B',
    primaryLight: '#D4A574',
    // Accent (dark)
    primaryDark: '#D4A574',
    primaryLightDark: '#E8C9A0',
    // Sidebar
    sidebarLight: '#f5f0ea',
    sidebarLightEnd: '#ebe4db',
    sidebarDark: '#211a14',
    sidebarDarkEnd: '#1a1410',
  },
}
```

### Dark Mode Default

```typescript
theme: {
  defaultMode: 'system',  // 'light' | 'dark' | 'system'
  // If not set, defaults to time-based (dark at night)
}
```

## Tech Badge Colors

150+ technologies are built-in with their brand colors (see `src/data/tech-registry.ts`).

Tech names in `techs` arrays are **type-checked**: your editor will autocomplete valid names and flag typos.

To add a custom technology, add it to the registry:

```typescript
// In src/data/tech-registry.ts
const TECH_REGISTRY = {
  // ... existing entries
  'My Custom Tool': { color: '#FF6600' },
} as const satisfies Record<string, { color: string }>
```

## SEO

```typescript
seo: {
  title: 'Jane Doe - Developer',
  description: 'Interactive resume of Jane Doe...',
}
```

At build time, a Vite plugin (`vite-plugin-resume-seo`) automatically reads your config and injects into the static HTML:

- **`<title>`** and **`<meta description>`** with your `seo` values
- **JSON-LD** structured data ([schema.org/Person](https://schema.org/Person)) with your name, job title, email, social links, and skills
- **`<noscript>` fallback** with the complete CV in semantic HTML (contact, skills, experiences, education, projects, hobbies)

This means crawlers, search engines, and ATS bots see your full resume content **without executing JavaScript**. No extra configuration needed — just fill in your `seo` fields and the plugin handles the rest.
