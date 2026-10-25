import { presets } from '../../data/presets'
import type { Palette, PresetName, ResumeConfig } from '../../types/resume'

export const THEME_STORAGE_KEY = 'resume-theme'
export const THEME_STYLE_ID = 'rt-theme'

const TOKENS: Record<keyof Palette, string> = {
  bg: '--rt-bg',
  surface: '--rt-surface',
  text: '--rt-text',
  muted: '--rt-muted',
  primary: '--rt-primary',
  accent: '--rt-accent',
  header: '--rt-header',
  headerText: '--rt-header-text',
  headerAccent: '--rt-header-accent',
}

function declarations(palette: Palette): string {
  return (Object.keys(TOKENS) as (keyof Palette)[])
    .map((key) => `${TOKENS[key]}:${palette[key]};`)
    .join('')
}

export function resolvePalettes(config: ResumeConfig, preset?: PresetName) {
  const base = presets[preset ?? config.theme?.preset ?? 'azure'] ?? presets.azure
  return {
    light: { ...base.light, ...config.theme?.light },
    dark: { ...base.dark, ...config.theme?.dark },
  }
}

export function themeCss(config: ResumeConfig, preset?: PresetName): string {
  const { light, dark } = resolvePalettes(config, preset)
  return `:root{${declarations(light)}}:root.dark{${declarations(dark)}}`
}
