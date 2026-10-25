import {
  CheckIcon,
  EmailIcon,
  ExternalLinkIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  PhoneIcon,
  WebsiteIcon,
} from '@/components/icons'
import type { ContactType } from '@/data/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'

const ICON_COMPONENTS: Record<ContactType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
  phone: PhoneIcon,
  location: LocationIcon,
  website: WebsiteIcon,
}

interface ContactItemProps {
  type: ContactType
  label: string
  href?: string
}

export function ContactItem({ type, label, href }: ContactItemProps) {
  const [copied, setCopied] = useState(false)
  const IconComponent = ICON_COMPONENTS[type]

  const isCopyable = type === 'email' || type === 'phone'
  const isExternal = type === 'github' || type === 'linkedin' || type === 'website'
  const resolvedHref = isCopyable ? undefined : href

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(label)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [label])

  const labelContent = (
    <span className="relative inline-flex items-center gap-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-resume-primary after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
      {label}
      {isExternal && (
        <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
      )}
    </span>
  )

  // Copyable items (email, phone): click anywhere to copy
  if (isCopyable) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className="group flex items-center gap-3 text-sm text-resume-text-secondary hover:text-resume-primary transition-colors duration-200 cursor-pointer"
      >
        <span className="relative w-4 h-4 text-resume-primary group-hover:scale-115 transition-transform duration-200">
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.10, ease: 'easeOut' }}
                className="absolute inset-0 text-green-500"
              >
                <CheckIcon className="w-4 h-4" />
              </motion.span>
            ) : (
              <motion.span
                key="icon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.10, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <IconComponent className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {labelContent}

        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-green-500 ml-1"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    )
  }

  // External links (github, linkedin, website)
  if (resolvedHref) {
    return (
      <a
        href={resolvedHref}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="group flex items-center gap-3 text-sm text-resume-text-secondary hover:text-resume-primary transition-colors duration-200"
      >
        <span className="text-resume-primary group-hover:scale-115 transition-transform duration-200">
          <IconComponent className="w-4 h-4" />
        </span>
        {labelContent}
      </a>
    )
  }

  // Plain text (location without href)
  return (
    <div className="group flex items-center gap-3 text-sm text-resume-text-secondary">
      <span className="text-resume-primary">
        <IconComponent className="w-4 h-4" />
      </span>
      <span>{label}</span>
    </div>
  )
}
