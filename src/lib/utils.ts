import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolves a public asset path with the Vite base URL.
 * Ensures paths like "/images/photo.jpg" work correctly
 * when the app is deployed under a subpath (e.g. GitHub Pages).
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  // Avoid double slashes: base already ends with "/", path starts with "/"
  if (path.startsWith('/')) {
    return `${base}${path.slice(1)}`
  }
  return `${base}${path}`
}
