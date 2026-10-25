import { useState } from 'react'
import { Check, Copy, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/icons'
import { useI18n } from '@/lib/i18n'
import type { Contact, ContactType } from '@/types/resume'

const CONTACT_ICONS: Record<ContactType, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  website: Globe,
}

function contactHref({ type, label, href }: Contact): string | undefined {
  if (href) return href
  if (type === 'email') return `mailto:${label}`
  if (type === 'phone') return `tel:${label.replace(/[^\d+]/g, '')}`
  return undefined
}

function CopyButton({ value }: { value: string }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard denied: the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? t.actions.copied : `${t.actions.copy} ${value}`}
      title={copied ? t.actions.copied : t.actions.copy}
      className="ml-1 rounded p-1 text-header-ink/50 opacity-0 transition hover:text-header-accent focus-visible:opacity-100 group-hover:opacity-100 print:hidden"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  )
}

export function ContactList({ items }: { items: Contact[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3">
      {items.map((item) => {
        const IconComponent = CONTACT_ICONS[item.type]
        const href = contactHref(item)
        const external = href?.startsWith('http')
        const content = (
          <>
            <IconComponent className="size-4 shrink-0 text-header-accent" />
            <span className="truncate">{item.label}</span>
          </>
        )

        return (
          <li key={`${item.type}-${item.label}`} className="group flex min-w-0 items-center">
            {href ? (
              <a
                href={href}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="flex min-w-0 items-center gap-2.5 text-header-ink/85 transition-colors hover:text-header-accent"
              >
                {content}
              </a>
            ) : (
              <span className="flex min-w-0 items-center gap-2.5 text-header-ink/85">{content}</span>
            )}
            {item.type === 'email' && <CopyButton value={item.label} />}
          </li>
        )
      })}
    </ul>
  )
}
