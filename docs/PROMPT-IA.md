# Prompt IA : générer `resume.ts` à partir de votre CV

Mode d'emploi : copiez tout le bloc ci-dessous dans ChatGPT, Claude ou un autre assistant, joignez votre CV (PDF ou texte), puis suivez ses questions.

````text
Tu aides une personne à transformer son CV en fichier de configuration TypeScript pour le projet
https://github.com/Aziguy/interactive-resume-template (schéma : src/types/resume.ts, exemple : src/config/resume.example.ts).

Étapes :
1. Demande le CV si absent, puis : langues voulues (fr, en, les deux), palette (azure, minimal, warm, ocean,
   forest, slate, lilac), adresse du site si connue.
2. Avant de générer, affiche un résumé : identité, contact, profil, expériences (entreprise, rôle, dates),
   formations, compétences groupées, langues, centres d'intérêt, et ce qui manque. Demande validation.
3. Génère le fichier complet, dans un seul bloc de code, sans commentaire superflu.

Règles de contenu :
- Profil : 3 à 5 lignes, concret, sans superlatifs creux.
- Expériences : 3 à 4 `highlights` par poste, une ligne chacun, verbe d'action + résultat chiffré si possible.
  Les informations secondaires vont dans `details` (dépliable, non imprimé).
- Dates au format 'YYYY-MM' (ou 'YYYY'), `end: 'present'` pour un poste en cours.
- Compétences : 3 à 5 groupes de 4 à 7 éléments. Utilise les noms exacts de technologies connues
  (React, TypeScript, Python, Django, PostgreSQL, Docker, Cypress, Selenium, Jenkins, GitHub Actions...).
- Icônes autorisées pour `facts` et `interests` : award, bike, book, briefcase, calendar, camera, car, code,
  coffee, dumbbell, film, flag, gamepad, globe, graduation, guitar, headphones, heart, id-card, mountain,
  palette, pen, piano, plane, rocket, sparkles, target, trophy, utensils.
- Chaque texte traduisible contient toutes les langues choisies : { fr: '...', en: '...' }.

Règles de syntaxe (le build échoue sinon) :
- Chaînes entre apostrophes simples. Dans le texte, utilise l'apostrophe typographique ’ (d’expérience),
  jamais l'apostrophe droite.
- Virgule après chaque élément, y compris le dernier.
- Pas de tiret cadratin ; utilise « · » ou « - ».

Squelette attendu :

import type { ResumeConfig } from '../types/resume'

export const resumeConfig: ResumeConfig = {
  i18n: { default: 'fr', available: ['fr', 'en'] },
  personal: {
    name: '',
    title: { fr: '', en: '' },
    headline: { fr: '', en: '' },
    availability: { fr: '', en: '' },
    location: '',
    facts: [{ icon: 'briefcase', label: { fr: '', en: '' } }],
  },
  contact: [
    { type: 'email', label: '' },
    { type: 'phone', label: '' },
    { type: 'linkedin', label: '', href: '' },
    { type: 'location', label: '' },
  ],
  profile: { fr: '', en: '' },
  experiences: [
    {
      id: '',
      role: { fr: '', en: '' },
      company: '',
      location: { fr: '', en: '' },
      period: { start: 'YYYY-MM', end: 'YYYY-MM' },
      highlights: { fr: [''], en: [''] },
      techs: [''],
    },
  ],
  education: [
    { id: '', kind: 'degree', title: { fr: '', en: '' }, school: '', period: { start: 'YYYY', end: 'YYYY' } },
  ],
  skills: [{ title: { fr: '', en: '' }, items: [''] }],
  languages: [{ name: { fr: '', en: '' }, level: { fr: '', en: '' }, score: 4 }],
  interests: [{ icon: 'book', label: { fr: '', en: '' } }],
  seo: { url: 'https://<utilisateur>.github.io/interactive-resume-template/' },
  theme: { preset: 'azure', defaultMode: 'system' },
}

Termine en rappelant : remplacer tout le contenu de src/config/resume.ts sur GitHub, valider, puis suivre
l'onglet Actions.
````
