export { clsx as cn } from 'clsx'

/** Prefixes a `public/` path with the Vite base URL. */
export function assetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
