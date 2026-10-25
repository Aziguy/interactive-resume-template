import type { ResumeConfig } from '../types/resume'

// Seul fichier à modifier pour personnaliser le CV. Modèle commenté : resume.example.ts
export const resumeConfig: ResumeConfig = {
  i18n: {
    default: 'fr',
    available: ['fr', 'en'],
  },

  personal: {
    name: 'Hippolyte Kengni',
    title: {
      fr: 'Développeur Full-Stack & Automatisation des tests',
      en: 'Full-Stack Developer & Test Automation Engineer',
    },
    headline: {
      fr: 'Certified Associate Web Developer · Python Programmer · Azure · GitHub · Scrum Fundamentals',
      en: 'Certified Associate Web Developer · Python Programmer · Azure · GitHub · Scrum Fundamentals',
    },
    availability: {
      fr: 'Recherche active d’un CDI à partir d’août 2025',
      en: 'Actively looking for a permanent position from August 2025',
    },
    location: 'Bordeaux, France',
    facts: [
      { icon: 'briefcase', label: { fr: '+8 ans d’expérience en IT', en: '8+ years in IT' } },
      { icon: 'car', label: { fr: 'Véhiculé, permis B', en: 'Driving licence, own car' } },
      { icon: 'globe', label: { fr: 'Mobile en France et à l’international', en: 'Open to relocation in France and abroad' } },
    ],
  },

  contact: [
    { type: 'phone', label: '+33 7 69 44 38 02', href: 'tel:+33769443802' },
    { type: 'email', label: 'kengnihippolyte@gmail.com' },
    { type: 'linkedin', label: 'hippolyte-kengni', href: 'https://www.linkedin.com/in/hippolyte-kengni/' },
    { type: 'github', label: 'Aziguy', href: 'https://github.com/Aziguy' },
    { type: 'website', label: 'aziguy.github.io/portfolio', href: 'https://aziguy.github.io/portfolio' },
    { type: 'location', label: '33000 Bordeaux, France' },
  ],

  profile: {
    fr: 'Développeur full-stack avec plus de 8 ans d’expérience en IT, je conçois des applications web robustes en Python, Django et React, et j’automatise les tests pour fiabiliser chaque livraison. Autodidacte (MOOCs, défis techniques), j’aime résoudre des problèmes complexes et je veille en continu sur les nouvelles technologies. Je souhaite rejoindre une équipe dynamique pour construire des solutions innovantes.',
    en: 'Full-stack developer with 8+ years in IT. I build robust web applications with Python, Django and React, and automate testing to make every release reliable. Self-taught through MOOCs and coding challenges, I enjoy solving complex problems and keep up with emerging technologies. I am looking to join a dynamic team to build innovative products.',
  },

  experiences: [
    {
      id: 'lectra-april',
      role: { fr: 'Ingénieur automatisation des tests', en: 'Test Automation Engineer' },
      company: 'Lectra · April',
      location: { fr: 'Cestas · Lyon', en: 'Cestas · Lyon, France' },
      period: { start: '2024-09', end: '2025-07' },
      highlights: {
        fr: [
          'Définition des stratégies de test (TNR, tests exploratoires, jeux de données) pour fiabiliser les livrables',
          'Conception de tests E2E automatisés pour les applications web avec Cypress, Selenium et Cucumber',
          'Revues de PR/MR et documentation des processus de test en environnement Agile',
          'Intégration continue et suivi qualité via Jenkins, GitHub Actions et GitLab CI',
        ],
        en: [
          'Defined test strategies (regression, exploratory testing, test data) to secure deliverables',
          'Designed automated E2E tests for web applications with Cypress, Selenium and Cucumber',
          'Reviewed PRs/MRs and documented test processes in an Agile setting',
          'Drove continuous integration and quality tracking with Jenkins, GitHub Actions and GitLab CI',
        ],
      },
      techs: ['Cypress', 'TypeScript', 'Selenium', 'Cucumber', 'Python', 'C#', 'Allure', 'Git'],
    },
    {
      id: 'ifb-cnrs',
      role: { fr: 'Ingénieur d’études · Développeur web full-stack', en: 'Research Engineer · Full-Stack Web Developer' },
      company: 'IFB · CNRS',
      location: { fr: 'France', en: 'France' },
      period: { start: '2021-11', end: '2024-11' },
      highlights: {
        fr: [
          'Développement d’API REST avec Django REST Framework et PostgreSQL, selon les principes SOLID et KISS',
          'Tests des web services avec Bruno et pytest (collections, environnements)',
          'Documentation complète de l’API avec Hugo et formation des développeurs juniors',
          'Pipelines CI/CD (GitHub Actions, Jenkins, Docker) pour automatiser build, tests et déploiements',
        ],
        en: [
          'Built REST APIs with Django REST Framework and PostgreSQL following SOLID and KISS principles',
          'Tested web services with Bruno and pytest (collections, environments)',
          'Wrote the full API documentation with Hugo and onboarded junior developers',
          'Set up CI/CD pipelines (GitHub Actions, Jenkins, Docker) to automate build, test and deployment',
        ],
      },
      techs: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Docker', 'GitHub Actions', 'PHP', 'WordPress'],
    },
    {
      id: 'dtn-solutions',
      role: { fr: 'Ingénieur QA logiciel · Assistant chef de projet', en: 'Software QA Engineer · Project Manager Assistant' },
      company: 'DTN Solutions',
      location: { fr: 'Vietnam', en: 'Vietnam' },
      period: { start: '2018-12', end: '2022-10' },
      highlights: {
        fr: [
          'Pilotage de l’assurance qualité et de l’automatisation des tests sur les projets clients',
          'Temps de test réduit de plus de 20 % grâce à des scripts Selenium et Robot Framework',
          'Tests E2E avec Cypress pour valider l’ensemble des composants applicatifs',
          'Suites de tests d’API Postman intégrées aux pipelines CI/CD, avec rapports détaillés',
        ],
        en: [
          'Led quality assurance and test automation across client projects',
          'Cut testing time by over 20% with Selenium and Robot Framework scripts',
          'Ran E2E tests with Cypress to validate every application component',
          'Built Postman API test suites integrated into CI/CD pipelines with detailed reports',
        ],
      },
      techs: ['Python', 'Selenium', 'Robot Framework', 'Cypress', 'Postman', 'Jenkins'],
    },
  ],

  education: [
    {
      id: 'google-pm',
      kind: 'certification',
      title: { fr: 'Google Project Management', en: 'Google Project Management' },
      school: 'Google · Coursera',
      period: { start: '2023-04', end: '2023-10' },
      description: {
        fr: 'Six modules sur la gestion de projet traditionnelle et Agile : initiation, planification, pilotage.',
        en: 'Six courses on traditional and Agile project management: initiation, planning, execution.',
      },
    },
    {
      id: 'master-2',
      kind: 'degree',
      title: { fr: 'Master 2 Ingénierie Web et ingénierie des données', en: 'Master’s degree in Web and Data Engineering' },
      school: 'UFR Ingémédia',
      period: { start: '2019-09', end: '2021-09' },
      description: {
        fr: 'Développement web, modèles analytiques, apprentissage automatique et data storytelling (Python, PHP, JavaScript).',
        en: 'Web development, analytical models, machine learning and data storytelling (Python, PHP, JavaScript).',
      },
    },
    {
      id: 'ibm-data',
      kind: 'certification',
      title: { fr: 'IBM Data Analyst & Data Scientist Professional', en: 'IBM Data Analyst & Data Scientist Professional' },
      school: 'IBM · Coursera',
      period: { start: '2020-12', end: '2021-06' },
      description: {
        fr: 'Analyse de données brutes avec Python, Excel et le machine learning, tableaux de bord et data storytelling.',
        en: 'Raw data analysis with Python, Excel and machine learning, dashboards and data storytelling.',
      },
    },
    {
      id: 'master-1',
      kind: 'degree',
      title: { fr: 'Master 1 Systèmes intelligents et multimédia', en: 'Master 1 in Intelligent Systems and Multimedia' },
      school: 'UNVH',
      period: { start: '2017-12', end: '2019-09' },
      description: {
        fr: 'IA et machine learning (analyse de sentiments, simulation GAMA), projets Java/C++ testés, workflows ML automatisés.',
        en: 'AI and machine learning (sentiment analysis, GAMA simulation), tested Java/C++ projects, automated ML workflows.',
      },
    },
  ],

  skills: [
    {
      title: { fr: 'Développement', en: 'Development' },
      items: ['Python', 'Django', 'Celery', 'React', 'TypeScript', { fr: 'API REST', en: 'REST APIs' }],
    },
    {
      title: { fr: 'Qualité & tests', en: 'Quality & testing' },
      items: ['Cypress', 'Selenium', 'Robot Framework', 'Postman', 'pytest', { fr: 'Frameworks d’automatisation', en: 'Automation frameworks' }],
    },
    {
      title: { fr: 'DevOps', en: 'DevOps' },
      items: ['Docker', 'Git', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'CI/CD'],
    },
    {
      title: { fr: 'Méthodes', en: 'Methods' },
      items: ['Scrum', 'Agile', { fr: 'Gestion de projet', en: 'Project management' }],
    },
  ],

  languages: [
    { name: { fr: 'Français', en: 'French' }, level: { fr: 'Courant', en: 'Fluent' }, score: 5 },
    { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'B2', en: 'B2' }, score: 4 },
    { name: { fr: 'Espagnol', en: 'Spanish' }, level: { fr: 'Scolaire', en: 'Basic' }, score: 2 },
  ],

  interests: [
    { icon: 'book', label: { fr: 'Lecture', en: 'Reading' } },
    { icon: 'camera', label: { fr: 'Photo', en: 'Photography' } },
    { icon: 'headphones', label: { fr: 'Musique', en: 'Music' } },
    { icon: 'plane', label: { fr: 'Voyage', en: 'Travel' } },
    { icon: 'bike', label: { fr: 'Sport', en: 'Sports' } },
  ],

  seo: {
    title: 'Hippolyte Kengni · Développeur Full-Stack & QA Automation',
    description:
      'CV interactif d’Hippolyte Kengni, développeur full-stack Python/Django/React et ingénieur en automatisation des tests (Cypress, Selenium), basé à Bordeaux.',
    url: 'https://aziguy.github.io/interactive-resume-template/',
  },

  theme: {
    preset: 'azure',
    defaultMode: 'light',
  },
}
