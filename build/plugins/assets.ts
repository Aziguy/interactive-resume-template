import type { Plugin } from 'vite'
import { detectAssets } from '../shared'

const VIRTUAL_ID = 'virtual:resume-assets'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

/** Exposes files dropped in `public/` as `virtual:resume-assets`. */
export function assetsPlugin(): Plugin {
  return {
    name: 'resume-assets',
    resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
    load(id) {
      if (id !== RESOLVED_ID) return
      return `export const assets = ${JSON.stringify(detectAssets())}`
    },
  }
}
