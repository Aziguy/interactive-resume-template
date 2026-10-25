import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { assetsPlugin } from './build/plugins/assets'
import { htmlPlugin } from './build/plugins/html'
import { pdfPlugin } from './build/plugins/pdf'
import { validatePlugin } from './build/plugins/validate'

export default defineConfig({
  // Set by the deploy workflow ("/" for a <user>.github.io repository).
  base: process.env.VITE_BASE_PATH ?? '/interactive-resume-template/',
  plugins: [react(), tailwindcss(), assetsPlugin(), validatePlugin(), htmlPlugin(), pdfPlugin()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
})
