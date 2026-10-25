declare module 'virtual:resume-assets' {
  /** Files found in `public/` at build time. */
  export const assets: {
    photo: string | null
    /** Hand-made PDFs from `public/cv/<lang>/`, keyed by language. */
    pdf: Record<string, string>
  }
}
