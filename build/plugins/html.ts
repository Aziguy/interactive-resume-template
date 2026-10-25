import type { Plugin } from 'vite'
import { getMessages } from '../../src/lib/i18n/messages'
import { formatPeriod, generatedPdfPath, localize, skillLabel } from '../../src/lib/resume'
import { THEME_STORAGE_KEY, THEME_STYLE_ID, resolvePalettes, themeCss } from '../../src/lib/theme/css'
import type { Localized, ResumeConfig } from '../../src/types/resume'
import { detectAssets, loadResumeConfig } from '../shared'

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function themeScript(config: ResumeConfig): string {
  const mode = JSON.stringify(config.theme?.defaultMode ?? 'system')
  return `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}'),m=${mode};var d=s?s==='dark':m==='dark'||(m==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}})()`
}

function jsonLd(config: ResumeConfig, l: (v: Localized) => string) {
  const links = config.contact.filter((c) => c.href?.startsWith('http')).map((c) => c.href!)
  const email = config.contact.find((c) => c.type === 'email')?.label
  const skills = config.skills.flatMap((group) => group.items.map((item) => skillLabel(item, config.i18n.default, config.i18n.default)))

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.personal.name,
    jobTitle: l(config.personal.title),
    ...(config.profile && { description: l(config.profile) }),
    ...(config.seo?.url && { url: config.seo.url }),
    ...(email && { email: `mailto:${email}` }),
    ...(config.personal.location && {
      address: { '@type': 'PostalAddress', addressLocality: config.personal.location },
    }),
    ...(links.length > 0 && { sameAs: links }),
    knowsAbout: [...new Set([...skills, ...config.experiences.flatMap((e) => e.techs ?? [])])],
    alumniOf: [...new Set(config.education.map((e) => e.school))].map((name) => ({ '@type': 'Organization', name })),
  }
}

/** Full resume as plain HTML for crawlers and visitors without JavaScript. */
function noscript(config: ResumeConfig, base: string): string {
  const lang = config.i18n.default
  const t = getMessages(lang, config.labels)
  const l = <T,>(v: Localized<T>) => localize(v, lang, lang)
  const section = (title: string, body: string) => (body ? `<section><h2>${escape(title)}</h2>${body}</section>` : '')
  const list = (items: string[]) => (items.length ? `<ul>${items.map((i) => `<li>${escape(i)}</li>`).join('')}</ul>` : '')

  const contact = config.contact
    .map((c) => {
      const href = c.href ?? (c.type === 'email' ? `mailto:${c.label}` : undefined)
      return `<li>${href ? `<a href="${escape(href)}">${escape(c.label)}</a>` : escape(c.label)}</li>`
    })
    .join('')

  const experiences = config.experiences
    .map((exp) => {
      const meta = [exp.company, exp.location && l(exp.location), formatPeriod(exp.period, lang, t)].filter(Boolean)
      return `<article><h3>${escape(l(exp.role))}</h3><p>${escape(meta.join(' · '))}</p>${
        exp.summary ? `<p>${escape(l(exp.summary))}</p>` : ''
      }${list(exp.highlights ? l(exp.highlights) : [])}${exp.techs ? `<p>${escape(exp.techs.join(', '))}</p>` : ''}</article>`
    })
    .join('')

  const education = config.education
    .map((edu) => {
      const meta = [edu.school, edu.period && formatPeriod(edu.period, lang, t)].filter(Boolean)
      return `<article><h3>${escape(l(edu.title))}</h3><p>${escape(meta.join(' · '))}</p>${
        edu.description ? `<p>${escape(l(edu.description))}</p>` : ''
      }</article>`
    })
    .join('')

  const skills = config.skills
    .map((group) => {
      const items = group.items.map((item) => skillLabel(item, lang, lang)).join(', ')
      return `<p>${group.title ? `<strong>${escape(l(group.title))}</strong> · ` : ''}${escape(items)}</p>`
    })
    .join('')

  const pdfPath = detectAssets().pdf[lang] ?? (config.pdf?.enabled === false ? null : generatedPdfPath(config, lang))
  const pdfLink = pdfPath ? `<p><a href="${escape(base + pdfPath.slice(1))}">${escape(t.actions.downloadPdf)}</a></p>` : ''

  return [
    '<style>.nojs{max-width:760px;margin:2rem auto;padding:0 1rem;font:16px/1.6 system-ui,sans-serif}.nojs h2{font-size:1.1rem;text-transform:uppercase;border-bottom:1px solid #ddd}.nojs h3{margin:1rem 0 0;font-size:1rem}</style>',
    '<div class="nojs">',
    `<header><h1>${escape(config.personal.name)}</h1><p>${escape(l(config.personal.title))}</p>${
      config.personal.availability ? `<p><strong>${escape(l(config.personal.availability))}</strong></p>` : ''
    }<ul>${contact}</ul></header>`,
    config.profile ? section(t.sections.profile, `<p>${escape(l(config.profile))}</p>`) : '',
    section(t.sections.experience, experiences),
    section(t.sections.education, education),
    section(t.sections.skills, skills),
    section(t.sections.languages, list((config.languages ?? []).map((x) => `${l(x.name)} · ${l(x.level)}`))),
    section(t.sections.interests, list((config.interests ?? []).map((x) => l(x.label)))),
    pdfLink,
    '</div>',
  ].join('')
}

/** Injects meta tags, theme, JSON-LD and a no-JS fallback into index.html. */
export function htmlPlugin(): Plugin {
  let base = '/'

  return {
    name: 'resume-html',
    configResolved(resolved) {
      base = resolved.base
    },
    async transformIndexHtml(html) {
      const config = await loadResumeConfig()
      const lang = config.i18n.default
      const l = (v: Localized) => localize(v, lang, lang)
      const title = config.seo?.title ?? `${config.personal.name} · ${l(config.personal.title)}`
      const description = config.seo?.description ?? (config.profile ? l(config.profile) : title)
      const url = config.seo?.url

      const head = [
        `<title>${escape(title)}</title>`,
        `<meta name="description" content="${escape(description)}" />`,
        `<meta name="theme-color" content="${resolvePalettes(config).light.header}" />`,
        `<meta property="og:type" content="profile" />`,
        `<meta property="og:title" content="${escape(title)}" />`,
        `<meta property="og:description" content="${escape(description)}" />`,
        `<meta property="og:locale" content="${escape(lang)}" />`,
        url && `<meta property="og:url" content="${escape(url)}" />`,
        url && `<link rel="canonical" href="${escape(url)}" />`,
        `<meta name="twitter:card" content="summary" />`,
        `<style id="${THEME_STYLE_ID}">${themeCss(config)}</style>`,
        `<script>${themeScript(config)}</script>`,
        `<script type="application/ld+json">${JSON.stringify(jsonLd(config, l)).replace(/</g, '\\u003c')}</script>`,
      ]
        .filter(Boolean)
        .join('\n    ')

      return html
        .replace(/<html lang="[^"]*">/, `<html lang="${escape(lang)}">`)
        .replace('<!--resume-head-->', head)
        .replace('<!--resume-noscript-->', noscript(config, base))
    },
  }
}
