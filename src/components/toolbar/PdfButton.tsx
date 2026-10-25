import { useState, type MouseEvent } from 'react'
import { Download, LoaderCircle } from 'lucide-react'
import { assets } from 'virtual:resume-assets'
import { resumeConfig } from '@/config/resume'
import { useI18n } from '@/lib/i18n'
import { generatedPdfPath } from '@/lib/resume'
import { assetUrl } from '@/lib/utils'

/** Hand-made PDF first, then the one generated at build time. */
function resolvePdfPath(lang: string): string | null {
  if (assets.pdf[lang]) return assets.pdf[lang]
  if (resumeConfig.pdf?.enabled === false) return null
  return generatedPdfPath(resumeConfig, lang)
}

async function isPdfAvailable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok && (res.headers.get('content-type') ?? '').includes('pdf')
  } catch {
    return false
  }
}

export function PdfButton() {
  const { lang, t } = useI18n()
  const [busy, setBusy] = useState(false)
  const path = resolvePdfPath(lang)
  const url = path ? assetUrl(path) : undefined
  const fileName = path?.split('/').pop()

  // Falls back to the print dialog when no PDF file is served (dev server, failed build step).
  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (!url || import.meta.env.DEV) return window.print()
    setBusy(true)
    const available = await isPdfAvailable(url)
    setBusy(false)
    if (!available) return window.print()
    const link = document.createElement('a')
    link.href = url
    link.download = fileName ?? 'resume.pdf'
    link.click()
  }

  return (
    <a
      href={url ?? '#'}
      download={fileName}
      onClick={handleClick}
      aria-busy={busy}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-surface shadow-sm transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {busy ? <LoaderCircle className="size-4 animate-spin" /> : <Download className="size-4" />}
      {busy ? t.actions.preparingPdf : t.actions.downloadPdf}
    </a>
  )
}
