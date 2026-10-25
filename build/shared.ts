import fs from 'node:fs'
import path from 'node:path'
import type { ResumeConfig } from '../src/types/resume'

export const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

export interface DetectedAssets {
  photo: string | null
  pdf: Record<string, string>
}

export async function loadResumeConfig(): Promise<ResumeConfig> {
  const mod = await import('../src/config/resume')
  return mod.resumeConfig
}

function firstFile(dir: string, extensions: string[]): string | null {
  if (!fs.existsSync(dir)) return null
  return fs.readdirSync(dir).find((file) => extensions.includes(path.extname(file).toLowerCase())) ?? null
}

/** Photo in `public/images/` and hand-made PDFs in `public/cv/<lang>/`. */
export function detectAssets(publicDir = PUBLIC_DIR): DetectedAssets {
  const photo = firstFile(path.join(publicDir, 'images'), IMAGE_EXTENSIONS)
  const pdf: Record<string, string> = {}
  const cvDir = path.join(publicDir, 'cv')

  if (fs.existsSync(cvDir)) {
    for (const lang of fs.readdirSync(cvDir)) {
      const file = firstFile(path.join(cvDir, lang), ['.pdf'])
      if (file) pdf[lang] = `/cv/${lang}/${file}`
    }
  }

  return { photo: photo && `/images/${photo}`, pdf }
}

export function log(plugin: string, message: string) {
  console.log(`\x1b[36m[${plugin}]\x1b[0m ${message}`)
}
