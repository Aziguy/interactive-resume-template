declare module 'virtual:detected-assets' {
  export const detectedAssets: {
    photo: string | null
    pdf: Record<string, string>
  }
}
