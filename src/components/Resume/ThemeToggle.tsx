import { motion } from 'framer-motion'
import { SunIcon, MoonIcon } from '@/components/icons'
import { useTheme } from '@/lib/theme'

interface ThemeToggleProps {
  label?: string
}

export function ThemeToggle({ label }: ThemeToggleProps) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-resume-primary/10 transition-colors"
      aria-label={label || 'Toggle dark mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <SunIcon className="w-5 h-5 text-resume-primary" />
        ) : (
          <MoonIcon className="w-5 h-5 text-resume-primary" />
        )}
      </motion.div>
    </button>
  )
}
