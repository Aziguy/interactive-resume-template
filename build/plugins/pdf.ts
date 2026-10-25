import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { preview, type Plugin, type PreviewServer, type ResolvedConfig } from 'vite'
import type { Browser } from 'playwright'
import { generatedPdfPath } from '../../src/lib/resume'
import { THEME_STORAGE_KEY } from '../../src/lib/theme/css'
import { detectAssets, loadResumeConfig, log } from '../shared'

const NAME = 'resume-pdf'

/**
 * Prints the built site to one A4 PDF per language with Playwright.
 * Skipped with RESUME_PDF=false or `--mode nopdf`. Fails the build on CI, warns locally.
 */
export function pdfPlugin(): Plugin {
  let vite: ResolvedConfig

  return {
    name: NAME,
    apply: 'build',
    configResolved(resolved) {
      vite = resolved
    },
    async closeBundle() {
      if (process.env.RESUME_PDF === 'false' || vite.mode === 'nopdf') return
      const config = await loadResumeConfig()
      if (config.pdf?.enabled === false) return

      const handmade = detectAssets().pdf
      const langs = config.i18n.available.filter((lang) => !handmade[lang])
      if (langs.length === 0) return

      const outDir = path.resolve(vite.root, vite.build.outDir)
      let server: PreviewServer | undefined
      let browser: Browser | undefined

      try {
        const { chromium } = await import('playwright')
        server = await preview({
          root: vite.root,
          base: vite.base,
          configFile: false,
          logLevel: 'silent',
          build: { outDir },
          preview: { host: '127.0.0.1', port: 4319 },
        })
        const url = server.resolvedUrls?.local[0]
        if (!url) throw new Error('preview server has no URL')

        browser = await chromium.launch()
        const page = await browser.newPage({ colorScheme: 'light', reducedMotion: 'reduce' })
        await page.addInitScript((key) => localStorage.setItem(key, 'light'), THEME_STORAGE_KEY)

        for (const lang of langs) {
          await page.goto(`${url}?lang=${lang}`, { waitUntil: 'networkidle' })
          await page.evaluate('document.fonts.ready')
          const file = path.join(outDir, generatedPdfPath(config, lang))
          await mkdir(path.dirname(file), { recursive: true })
          await page.pdf({ path: file, preferCSSPageSize: true, printBackground: true, tagged: true, outline: true })
          log(NAME, `${path.relative(vite.root, file)}`)
        }
      } catch (error) {
        const message = `PDF non généré : ${(error as Error).message.split('\n')[0]}
  Installez Chromium (npx playwright install chromium) ou désactivez avec RESUME_PDF=false.`
        if (process.env.CI) throw new Error(`[${NAME}] ${message}`)
        console.warn(`\x1b[33m[${NAME}] ${message}\x1b[0m`)
      } finally {
        await browser?.close()
        await server?.close()
      }
    },
  }
}
