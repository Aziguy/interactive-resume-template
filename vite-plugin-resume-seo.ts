import type { Plugin } from 'vite'
import type { ResumeConfig } from './src/data/types'
import fs from 'fs'
import path from 'path'

/**
 * Vite plugin that injects SEO data directly into the HTML at build time.
 *
 * Since this is a CSR SPA, bots that don't execute JavaScript see an empty page.
 * This plugin reads `resume-config` at build time and injects:
 * - JSON-LD structured data (schema.org Person)
 * - Proper <title> and <meta description>
 * - A rich <noscript> fallback with the full CV content in semantic HTML
 *
 * This ensures crawlers and ATS systems can read the resume data without JS.
 */
export function resumeSeoPlugin(): Plugin {
  let config: ResumeConfig | null = null
  let base = '/'

  return {
    name: 'resume-seo',
    configResolved(resolvedConfig) {
      base = resolvedConfig.base
    },
    async buildStart() {
      // Dynamically import the resume config (works because Vite resolves TS)
      try {
        const mod = await import('./src/data/resume-config')
        config = mod.resumeConfig
      } catch (e) {
        console.warn('[resume-seo] Could not load resume-config, skipping SEO injection:', e)
      }
    },
    transformIndexHtml(html) {
      if (!config) return html

      const defaultLang = config.languages.default
      const resolve = (ls: Record<string, string>) =>
        ls[defaultLang] ?? Object.values(ls)[0] ?? ''

      // 1. Build JSON-LD
      const jsonLd = buildJsonLd(config, resolve)

      // 2. Build noscript HTML with full CV content
      const noscriptContent = buildNoscriptHtml(config, resolve, base)

      // 3. Replace title
      html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${escapeHtml(config.seo.title)}</title>`,
      )

      // 4. Replace meta description
      html = html.replace(
        /<meta name="description" content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${escapeHtml(config.seo.description)}" />`,
      )

      // 5. Inject JSON-LD before </head>
      html = html.replace(
        '</head>',
        `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`,
      )

      // 6. Replace the existing <noscript> with the enriched version
      html = html.replace(
        /<noscript>[\s\S]*?<\/noscript>/,
        `<noscript>\n${noscriptContent}\n    </noscript>`,
      )

      return html
    },
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildJsonLd(
  config: ResumeConfig,
  resolve: (ls: Record<string, string>) => string,
) {
  const { personal, contact } = config
  const sameAs: string[] = []
  let email: string | undefined
  let url: string | undefined

  for (const c of contact) {
    if (c.type === 'github' && c.href) sameAs.push(c.href)
    if (c.type === 'linkedin' && c.href) sameAs.push(c.href)
    if (c.type === 'website' && c.href) url = c.href
    if (c.type === 'email') email = c.label
  }

  const techs = [...new Set(config.experiences.flatMap((exp) => exp.techs))]

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: resolve(personal.title),
    ...(url && { url }),
    ...(email && { email }),
    ...(personal.location && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: personal.location,
      },
    }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(techs.length > 0 && { knowsAbout: techs }),
  }
}

function buildNoscriptHtml(
  config: ResumeConfig,
  resolve: (ls: Record<string, string>) => string,
  base: string,
): string {
  const { personal, contact, skills, experiences, education, projects, hobbies, pdf } = config
  const lines: string[] = []

  const indent = '      '
  lines.push(`${indent}<div style="max-width: 800px; margin: 2rem auto; padding: 2rem; font-family: system-ui, -apple-system, sans-serif; color: #1c1c1c; line-height: 1.6;">`)

  // Header
  lines.push(`${indent}  <header style="margin-bottom: 2rem; border-bottom: 2px solid #e5e5e5; padding-bottom: 1rem;">`)
  lines.push(`${indent}    <h1 style="margin: 0 0 0.25rem 0; font-size: 1.75rem;">${escapeHtml(personal.name)}</h1>`)
  lines.push(`${indent}    <p style="margin: 0 0 0.25rem 0; font-size: 1.1rem; color: #555;">${escapeHtml(resolve(personal.title))}</p>`)
  if (personal.subtitle) {
    lines.push(`${indent}    <p style="margin: 0 0 0.25rem 0; color: #777;">${escapeHtml(resolve(personal.subtitle))}</p>`)
  }
  if (personal.location) {
    lines.push(`${indent}    <p style="margin: 0; color: #777;">${escapeHtml(personal.location)}</p>`)
  }
  lines.push(`${indent}  </header>`)

  // Contact
  if (contact.length > 0) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    <h2 style="font-size: 1.1rem; text-transform: uppercase; color: #333; border-bottom: 1px solid #eee; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">${escapeHtml(resolve(config.labels.sections.contact))}</h2>`)
    lines.push(`${indent}    <ul style="list-style: none; padding: 0; margin: 0;">`)
    for (const c of contact) {
      if (c.href) {
        lines.push(`${indent}      <li style="margin-bottom: 0.25rem;"><a href="${escapeHtml(c.href)}" style="color: #1e6091;">${escapeHtml(c.label)}</a></li>`)
      } else {
        lines.push(`${indent}      <li style="margin-bottom: 0.25rem;">${escapeHtml(c.label)}</li>`)
      }
    }
    lines.push(`${indent}    </ul>`)
    lines.push(`${indent}  </section>`)
  }

  // Skills
  if (skills.length > 0) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    <h2 style="font-size: 1.1rem; text-transform: uppercase; color: #333; border-bottom: 1px solid #eee; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">${escapeHtml(resolve(config.labels.sections.skills))}</h2>`)
    for (const cat of skills) {
      lines.push(`${indent}    <p style="margin: 0.5rem 0 0.25rem 0; font-weight: 600;">${escapeHtml(resolve(cat.title))}</p>`)
      const skillNames = cat.items.map((item) => {
        const name = typeof item.name === 'string' ? item.name : resolve(item.name)
        if (cat.type === 'languages' && item.level) {
          return `${name} (${resolve(item.level)})`
        }
        return name
      })
      lines.push(`${indent}    <p style="margin: 0; color: #555;">${escapeHtml(skillNames.join(' · '))}</p>`)
    }
    lines.push(`${indent}  </section>`)
  }

  // Experiences
  if (experiences.length > 0) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    <h2 style="font-size: 1.1rem; text-transform: uppercase; color: #333; border-bottom: 1px solid #eee; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">${escapeHtml(resolve(config.labels.sections.experience))}</h2>`)
    for (const exp of experiences) {
      lines.push(`${indent}    <article style="margin-bottom: 1.25rem;">`)
      lines.push(`${indent}      <h3 style="margin: 0 0 0.15rem 0; font-size: 1rem;">${escapeHtml(resolve(exp.role))} — ${escapeHtml(resolve(exp.company))}</h3>`)
      const meta = [resolve(exp.period)]
      if (exp.type) meta.push(resolve(exp.type))
      lines.push(`${indent}      <p style="margin: 0 0 0.25rem 0; color: #777; font-size: 0.9rem;">${escapeHtml(meta.join(' · '))}</p>`)
      lines.push(`${indent}      <p style="margin: 0 0 0.25rem 0;">${escapeHtml(resolve(exp.description))}</p>`)
      if (exp.techs.length > 0) {
        lines.push(`${indent}      <p style="margin: 0; color: #555; font-size: 0.9rem;">${escapeHtml(exp.techs.join(', '))}</p>`)
      }
      if (exp.details?.tasks) {
        const tasks = exp.details.tasks[config.languages.default] ?? Object.values(exp.details.tasks)[0]
        if (tasks && tasks.length > 0) {
          lines.push(`${indent}      <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">`)
          for (const task of tasks) {
            lines.push(`${indent}        <li style="margin-bottom: 0.15rem; font-size: 0.9rem;">${escapeHtml(task)}</li>`)
          }
          lines.push(`${indent}      </ul>`)
        }
      }
      lines.push(`${indent}    </article>`)
    }
    lines.push(`${indent}  </section>`)
  }

  // Education
  if (education.length > 0) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    <h2 style="font-size: 1.1rem; text-transform: uppercase; color: #333; border-bottom: 1px solid #eee; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">${escapeHtml(resolve(config.labels.sections.education))}</h2>`)
    for (const edu of education) {
      lines.push(`${indent}    <div style="margin-bottom: 0.75rem;">`)
      lines.push(`${indent}      <p style="margin: 0; font-weight: 600;">${escapeHtml(resolve(edu.degree))}</p>`)
      if (edu.specialty) {
        lines.push(`${indent}      <p style="margin: 0; color: #555;">${escapeHtml(resolve(edu.specialty))}</p>`)
      }
      const eduMeta = [resolve(edu.school)]
      if (edu.period) eduMeta.push(edu.period)
      lines.push(`${indent}      <p style="margin: 0; color: #777; font-size: 0.9rem;">${escapeHtml(eduMeta.join(' · '))}</p>`)
      lines.push(`${indent}    </div>`)
    }
    lines.push(`${indent}  </section>`)
  }

  // Projects
  if (projects && projects.length > 0 && config.labels.sections.projects) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    <h2 style="font-size: 1.1rem; text-transform: uppercase; color: #333; border-bottom: 1px solid #eee; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">${escapeHtml(resolve(config.labels.sections.projects))}</h2>`)
    for (const proj of projects) {
      lines.push(`${indent}    <div style="margin-bottom: 0.75rem;">`)
      const titleHtml = proj.url
        ? `<a href="${escapeHtml(proj.url)}" style="color: #1e6091;">${escapeHtml(resolve(proj.title))}</a>`
        : escapeHtml(resolve(proj.title))
      lines.push(`${indent}      <p style="margin: 0; font-weight: 600;">${titleHtml}</p>`)
      lines.push(`${indent}      <p style="margin: 0; color: #555;">${escapeHtml(resolve(proj.description))}</p>`)
      if (proj.techs.length > 0) {
        lines.push(`${indent}      <p style="margin: 0; color: #777; font-size: 0.9rem;">${escapeHtml(proj.techs.join(', '))}</p>`)
      }
      lines.push(`${indent}    </div>`)
    }
    lines.push(`${indent}  </section>`)
  }

  // Hobbies
  if (hobbies && hobbies.length > 0 && config.labels.sections.hobbies) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    <h2 style="font-size: 1.1rem; text-transform: uppercase; color: #333; border-bottom: 1px solid #eee; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">${escapeHtml(resolve(config.labels.sections.hobbies))}</h2>`)
    const hobbyNames = hobbies.map((h) => resolve(h.title))
    lines.push(`${indent}    <p style="margin: 0; color: #555;">${escapeHtml(hobbyNames.join(' · '))}</p>`)
    lines.push(`${indent}  </section>`)
  }

  // PDF download link — priority: config > auto-detected
  const lang = config.languages.default
  let pdfPath: string | null = null
  if (pdf) {
    pdfPath = typeof pdf.path === 'string' ? pdf.path : (pdf.path[lang] ?? Object.values(pdf.path)[0] ?? null)
  } else {
    // Auto-detect from public/cv/<lang>/
    const cvLangDir = path.resolve(process.cwd(), 'public', 'cv', lang)
    if (fs.existsSync(cvLangDir)) {
      const pdfFile = fs.readdirSync(cvLangDir).find((f) => f.toLowerCase().endsWith('.pdf'))
      if (pdfFile) pdfPath = `/cv/${lang}/${pdfFile}`
    }
  }
  if (pdfPath) {
    const pdfHref = pdfPath.startsWith('/') ? `${base.replace(/\/$/, '')}${pdfPath}` : pdfPath
    lines.push(`${indent}  <p style="margin-top: 2rem; text-align: center;"><a href="${escapeHtml(pdfHref)}" style="color: #1e6091; font-weight: 500;">📄 Download PDF</a></p>`)
  }

  lines.push(`${indent}</div>`)

  return lines.join('\n')
}
