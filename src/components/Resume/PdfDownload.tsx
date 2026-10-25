import { DownloadIcon } from '@/components/icons'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { assetUrl } from '@/lib/utils'
import { detectedAssets } from 'virtual:detected-assets'

const DEFAULT_LABELS: Record<string, string> = {
  fr: 'Télécharger le PDF',
  en: 'Download PDF',
}

export function PdfDownload() {
  const { language, resolve } = useTranslation()

  // Priority: explicit config > auto-detected from public/cv/<lang>/
  let resolvedPath: string | null = null

  if (resumeConfig.pdf) {
    const { path } = resumeConfig.pdf
    resolvedPath = typeof path === 'string'
      ? path
      : path[language] ?? null
  } else if (detectedAssets.pdf[language]) {
    resolvedPath = detectedAssets.pdf[language]
  }

  if (!resolvedPath) return null

  // Resolve label: explicit config > labels.actions > auto-detect default > fallback
  let downloadLabel: string

  if (resumeConfig.pdf?.label) {
    downloadLabel = resolve(resumeConfig.pdf.label)
  } else if (resumeConfig.labels.actions.downloadPdf) {
    downloadLabel = resolve(resumeConfig.labels.actions.downloadPdf)
  } else {
    downloadLabel = DEFAULT_LABELS[language] ?? DEFAULT_LABELS.en ?? 'Download PDF'
  }

  return (
    <a
      href={assetUrl(resolvedPath)}
      download={resolvedPath.split('/').pop() ?? 'resume.pdf'}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-resume-primary/10 text-resume-primary hover:bg-resume-primary/20 transition-colors text-sm font-medium"
    >
      <DownloadIcon className="w-4 h-4" />
      {downloadLabel}
    </a>
  )
}
