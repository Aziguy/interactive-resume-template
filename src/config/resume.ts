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
      fr: 'Ingénieur automatisation des tests & Développeur Full-Stack',
      en: 'Test Automation Engineer & Full-Stack Developer',
    },
    headline: {
      fr: 'Certified Associate Web Developer · Python Programmer · Azure · GitHub · Scrum Fundamentals',
      en: 'Certified Associate Web Developer · Python Programmer · Azure · GitHub · Scrum Fundamentals',
    },
    availability: {
      fr: 'Actuellement en poste chez Dedalus Healthcare France',
      en: 'Currently at Dedalus Healthcare France',
    },
    location: 'Bordeaux, France',
    facts: [
      { icon: 'briefcase', label: { fr: '+8 ans d’expérience en IT', en: '8+ years in IT' } },
      {
        icon: 'award',
        label: { fr: '+50 certifications Credly', en: '50+ Credly certifications' },
        href: 'https://www.credly.com/users/hippolyte-kengni/badges/credly',
      },
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
    fr: 'Ingénieur en automatisation des tests et développeur full-stack, fort de plus de 8 ans d’expérience en IT. Je bâtis des stratégies de test outillées, traçables et maintenables (Playwright, Cypress, Selenium, Xray) et des applications web robustes en Python, Django et React. Convaincu que l’IA transforme le métier de la qualité, j’exploite LLM et agents pour concevoir, générer et maintenir les tests plus vite, avec l’objectif d’une couverture proche de 100 %. Autodidacte, titulaire de plus de 50 certifications, je rends la qualité mesurable et partagée par toute l’équipe.',
    en: 'Test automation engineer and full-stack developer with 8+ years in IT. I build tooled, traceable and maintainable test strategies (Playwright, Cypress, Selenium, Xray) and robust web applications with Python, Django and React. Convinced that AI is reshaping quality engineering, I use LLMs and agents to design, generate and maintain tests faster, aiming for near 100% coverage. Self-taught and holder of 50+ certifications, I make quality measurable and shared across the whole team.',
  },

  experiences: [
    {
      id: 'dedalus',
      role: { fr: 'Ingénieur automatisation des tests', en: 'Test Automation Engineer' },
      company: 'Dedalus Healthcare France',
      period: { start: '2025-10', end: 'present' },
      summary: {
        fr: 'Référent automatisation sur des logiciels de santé : je fais évoluer la stratégie de test vers un modèle outillé, traçable et augmenté par l’IA.',
        en: 'Automation lead on healthcare software, evolving the test strategy towards a tooled, traceable and AI-augmented model.',
      },
      highlights: {
        fr: [
          'Maintien et fiabilisation du référentiel de tests automatisés construit avec Agilitest',
          'Conception d’une méthodologie de test pour structurer un référentiel unique et traçable dans Xray (exigences, cas de test, campagnes)',
          'Étude et proposition de nouvelles solutions d’automatisation (Playwright, Cypress) pour accélérer et pérenniser les campagnes',
          'Démarche d’IA appliquée aux tests (LLM, agents) pour générer et revoir les cas de test, gagner en productivité et viser une couverture proche de 100 %',
        ],
        en: [
          'Maintain and harden the automated test repository built with Agilitest',
          'Designed a test methodology to build a single, traceable test repository in Xray (requirements, test cases, executions)',
          'Assess and propose new automation solutions (Playwright, Cypress) to speed up and future-proof test campaigns',
          'Drive AI-assisted testing (LLMs, agents) to generate and review test cases, boost productivity and target near 100% coverage',
        ],
      },
      techs: ['Agilitest', 'Xray', 'Jira', 'Playwright', 'Cypress', 'TypeScript', 'LLM'],
    },
    {
      id: 'lectra-april',
      role: { fr: 'Ingénieur automatisation des tests', en: 'Test Automation Engineer' },
      company: 'Lectra · April',
      location: { fr: 'Cestas · Lyon', en: 'Cestas · Lyon, France' },
      period: { start: '2024-09', end: '2025-07' },
      highlights: {
        fr: [
          'Stratégies de test définies de bout en bout (non-régression, tests exploratoires, jeux de données) pour sécuriser chaque livraison',
          'Suites E2E automatisées sur les applications web avec Cypress, Selenium et Cucumber (BDD)',
          'Revues de PR/MR et documentation des processus de test au sein d’équipes Agile',
          'Tests intégrés aux pipelines CI/CD (Jenkins, GitHub Actions, GitLab CI) avec reporting Allure',
        ],
        en: [
          'Defined end-to-end test strategies (regression, exploratory testing, test data) to secure every release',
          'Built automated E2E suites for web applications with Cypress, Selenium and Cucumber (BDD)',
          'Reviewed PRs/MRs and documented test processes within Agile teams',
          'Integrated tests into CI/CD pipelines (Jenkins, GitHub Actions, GitLab CI) with Allure reporting',
        ],
      },
      techs: ['Cypress', 'TypeScript', 'Selenium', 'Cucumber', 'Python', 'C#', 'Allure', 'Git'],
    },
    {
      id: 'ifb-cnrs',
      role: { fr: 'Ingénieur · Dév web full-stack', en: 'Engineer · Full-Stack Web Dev' },
      company: 'IFB · CNRS',
      location: { fr: 'France', en: 'France' },
      period: { start: '2021-11', end: '2024-11' },
      highlights: {
        fr: [
          'Conception d’API REST robustes et sécurisées (Django REST Framework, PostgreSQL) selon les principes SOLID et KISS',
          'Fiabilité des web services garantie par des tests automatisés pytest et des collections Bruno',
          'Documentation complète de l’API avec Hugo et montée en compétence des développeurs juniors',
          'Pipelines CI/CD (GitHub Actions, Jenkins, Docker) automatisant build, tests et déploiements',
          'Conception de sites d’équipe sous WordPress : thèmes, plugins, blocs Gutenberg et custom post types sur mesure',
        ],
        en: [
          'Designed robust, secure REST APIs (Django REST Framework, PostgreSQL) following SOLID and KISS principles',
          'Ensured web service reliability with automated pytest suites and Bruno collections',
          'Wrote the full API documentation with Hugo and coached junior developers',
          'Built CI/CD pipelines (GitHub Actions, Jenkins, Docker) automating build, test and deployment',
          'Designed team websites on WordPress: custom themes, plugins, Gutenberg blocks and custom post types',
        ],
      },
      techs: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Docker', 'GitHub Actions', 'PHP', 'WordPress'],
    },
    {
      id: 'dtn-solutions',
      role: { fr: 'QA · Assistant chef de projet', en: 'QA · Project Manager Assistant' },
      company: 'DTN Solutions',
      location: { fr: 'Vietnam', en: 'Vietnam' },
      period: { start: '2018-12', end: '2022-10' },
      highlights: {
        fr: [
          'Pilotage de l’assurance qualité et de l’automatisation des tests sur l’ensemble des projets clients',
          'Temps de test réduit de plus de 20 % grâce à des scripts Selenium et Robot Framework',
          'Tests E2E Cypress couvrant l’ensemble des composants applicatifs',
          'Suites de tests d’API Postman intégrées aux pipelines CI/CD, avec rapports détaillés',
        ],
        en: [
          'Led quality assurance and test automation across all client projects',
          'Cut testing time by over 20% with Selenium and Robot Framework scripts',
          'Covered every application component with Cypress E2E tests',
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
      title: { fr: 'Qualité & tests', en: 'Quality & testing' },
      items: ['Playwright', 'Cypress', 'Selenium', 'Robot Framework', 'Agilitest', 'Xray', 'Postman', 'pytest'],
    },
    {
      title: { fr: 'IA & productivité', en: 'AI & productivity' },
      items: [
        'LLM',
        { fr: 'Agents IA', en: 'AI agents' },
        'Agent Skills',
        'MCP',
        'Prompt engineering',
        { fr: 'Tests générés par IA', en: 'AI-generated tests' },
      ],
    },
    {
      title: { fr: 'Développement', en: 'Development' },
      items: ['Python', 'Django', 'Celery', 'React', 'TypeScript', { fr: 'API REST', en: 'REST APIs' }],
    },
    {
      title: { fr: 'DevOps', en: 'DevOps' },
      items: ['Docker', 'Git', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'CI/CD'],
    },
    {
      title: { fr: 'Méthodes', en: 'Methods' },
      items: ['Scrum', 'Agile', 'BDD', { fr: 'Gestion de projet', en: 'Project management' }],
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
    title: 'Hippolyte Kengni · Ingénieur automatisation des tests & Développeur Full-Stack',
    description:
      'CV interactif d’Hippolyte Kengni, ingénieur en automatisation des tests (Playwright, Cypress, Xray, IA) et développeur full-stack Python/Django/React, basé à Bordeaux.',
    url: 'https://aziguy.github.io/interactive-resume-template/',
  },

  theme: {
    preset: 'azure',
    defaultMode: 'light',
  },
}
