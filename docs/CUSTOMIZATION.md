# Guide de personnalisation

Tout le CV est décrit dans [`src/config/resume.ts`](../src/config/resume.ts). Le fichier est typé (`ResumeConfig`, voir [`src/types/resume.ts`](../src/types/resume.ts)) : votre éditeur propose l'autocomplétion et signale les erreurs. Un modèle commenté est disponible dans [`resume.example.ts`](../src/config/resume.example.ts).

Au build, le plugin `resume-validate` liste les points à corriger : traductions manquantes, dates mal formées, ids en double, icônes inconnues, photo introuvable.

## Textes multilingues

Les champs traduisibles prennent une entrée par langue déclarée dans `i18n.available` :

```ts
title: { fr: 'Développeur', en: 'Developer' }
highlights: { fr: ['Point 1', 'Point 2'], en: ['Item 1', 'Item 2'] }
```

```ts
i18n: {
  default: 'fr',            // langue de repli, du HTML statique et du SEO
  available: ['fr', 'en'],  // une seule langue masque le sélecteur
  labels: { fr: 'FR', en: 'EN' }, // optionnel
}
```

Les libellés de l'interface (titres de sections, boutons, dates) sont intégrés en français et en anglais. Pour une autre langue ou un autre intitulé, utilisez `labels` :

```ts
labels: {
  fr: { sections: { experience: 'Parcours' } },
  de: { sections: { experience: 'Berufserfahrung', skills: 'Kenntnisse' } },
}
```

## En-tête

```ts
personal: {
  name: 'Jane Doe',
  title: { fr: 'Développeuse Full-Stack', en: 'Full-Stack Developer' },
  headline: { fr: 'Certifiée AWS · React', en: 'AWS Certified · React' }, // optionnel
  availability: { fr: 'Disponible en septembre', en: 'Available in September' }, // mis en avant
  location: 'Paris, France',
  photo: '/images/me.jpg', // optionnel
  facts: [
    { icon: 'briefcase', label: { fr: "6 ans d'expérience", en: '6 years of experience' } },
    { icon: 'car', label: { fr: 'Permis B', en: 'Driving licence' } },
  ],
}
```

- **Photo** : sans `photo`, la première image de `public/images/` est utilisée ; à défaut, les initiales. Format carré conseillé (400 × 400 px).
- **Icônes** disponibles : voir [`icon-names.ts`](../src/components/ui/icon-names.ts) (`briefcase`, `car`, `globe`, `award`, `book`, `camera`, `plane`, `bike`...).

## Contact

```ts
contact: [
  { type: 'phone', label: '+33 6 12 34 56 78' },          // lien tel: automatique
  { type: 'email', label: 'jane@example.com' },           // lien mailto: et bouton copier
  { type: 'linkedin', label: 'janedoe', href: 'https://linkedin.com/in/janedoe' },
  { type: 'github', label: 'janedoe', href: 'https://github.com/janedoe' },
  { type: 'website', label: 'janedoe.dev', href: 'https://janedoe.dev' },
  { type: 'location', label: 'Paris, France' },
]
```

## Profil

```ts
profile: { fr: 'Trois à cinq lignes qui résument votre valeur.', en: '...' }
```

## Expériences

```ts
experiences: [
  {
    id: 'acme',                                   // unique
    role: { fr: 'Lead développeuse', en: 'Lead developer' },
    company: 'Acme',
    location: { fr: 'Lyon', en: 'Lyon, France' }, // optionnel
    contract: { fr: 'CDI', en: 'Permanent' },      // optionnel, badge
    period: { start: '2022-03', end: 'present' },  // YYYY ou YYYY-MM
    summary: { fr: '...', en: '...' },             // optionnel
    highlights: { fr: ['...'], en: ['...'] },      // visibles et imprimés
    techs: ['React', 'TypeScript'],
    details: {                                     // optionnel, dépliable, non imprimé
      context: { fr: '...', en: '...' },
      tasks: { fr: ['...'], en: ['...'] },
    },
  },
]
```

La période est formatée selon la langue (« Mars 2022 - Aujourd'hui », « Mar 2022 - Present ») et la durée est calculée (« 2 ans 7 mois »). Gardez 3 à 4 `highlights` courts, orientés résultats : c'est ce qui rend le PDF lisible.

## Formations et certifications

```ts
education: [
  {
    id: 'master',
    kind: 'degree',            // 'degree' ou 'certification' (change l'icône)
    title: { fr: 'Master Informatique', en: "Master's in Computer Science" },
    school: 'Université de Lyon',
    period: { start: '2017', end: '2019' }, // ou { start: '2023-06' } pour une date unique
    description: { fr: '...', en: '...' },  // optionnel
    url: 'https://...',                     // optionnel (lien de vérification)
  },
]
```

## Compétences

```ts
skills: [
  { title: { fr: 'Développement', en: 'Development' }, items: ['Python', 'Django', 'React'] },
  { title: { fr: 'Méthodes', en: 'Methods' }, items: ['Scrum', { fr: 'Revue de code', en: 'Code review' }] },
]
```

Un élément est soit un nom de technologie (sa couleur de marque est reprise depuis [`tech-registry.ts`](../src/data/tech-registry.ts)), soit un libellé traduit. Pour ajouter une technologie au registre :

```ts
'Ma Techno': { color: '#FF6600' },
```

## Langues, centres d'intérêt, projets

```ts
languages: [
  { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'C1', en: 'C1' }, score: 4 }, // score 1 à 5
],
interests: [
  { icon: 'camera', label: { fr: 'Photo', en: 'Photography' } },
],
projects: [
  {
    id: 'meteo',
    title: { fr: 'Météo', en: 'Weather' },
    description: { fr: '...', en: '...' },
    techs: ['React'],
    url: 'https://...',
    repo: 'https://github.com/...',
  },
],
```

Toute section vide ou absente est masquée.

## PDF

Par défaut, un PDF A4 par langue est généré au build (`dist/cv/<langue>/CV_<Nom>_<LANGUE>.pdf`).

```ts
pdf: {
  enabled: true,                    // false pour désactiver
  fileName: 'CV_Jane_Doe_{lang}',   // {lang} devient FR, EN...
}
```

- Un PDF déposé dans `public/cv/<langue>/` est prioritaire pour cette langue.
- Le rendu PDF utilise la feuille de style d'impression : thème clair, détails dépliables masqués, lien vers la version en ligne en pied de page (si `seo.url` est renseigné).
- Si aucun fichier n'est servi, le bouton ouvre la boîte d'impression du navigateur.

## SEO

```ts
seo: {
  title: 'Jane Doe · Développeuse Full-Stack',   // défaut : « nom · titre »
  description: 'CV de Jane Doe...',              // défaut : le profil
  url: 'https://janedoe.github.io/interactive-resume-template/',
}
```

Le plugin `resume-html` injecte au build le titre, la description, les balises Open Graph, l'URL canonique, un JSON-LD `schema.org/Person` et une version HTML complète du CV dans `<noscript>`.

## Thème

```ts
theme: {
  preset: 'azure',        // azure | minimal | warm | ocean | forest | slate | lilac
  defaultMode: 'system',  // light | dark | system
  light: { accent: '#0b74b0' }, // surcharge d'un jeton
  dark: { header: '#1f2430' },
}
```

Jetons disponibles : `bg`, `surface`, `text`, `muted`, `primary`, `accent`, `header`, `headerText`, `headerAccent`. En développement, un sélecteur en bas à gauche permet d'essayer les palettes.
