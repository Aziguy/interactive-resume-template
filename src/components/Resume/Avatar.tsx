import { useState } from 'react'
import { assets } from 'virtual:resume-assets'
import { initials } from '@/lib/resume'
import { assetUrl } from '@/lib/utils'

export function Avatar({ name, photo }: { name: string; photo?: string }) {
  const src = photo ?? assets.photo
  const [failed, setFailed] = useState(false)
  const frame = 'size-24 shrink-0 rounded-full ring-4 ring-header-ink/10 sm:size-28 print:size-24'

  if (!src || failed) {
    return (
      <div
        aria-hidden="true"
        className={`${frame} grid place-items-center bg-header-accent/15 text-3xl font-bold tracking-wide text-header-accent`}
      >
        {initials(name)}
      </div>
    )
  }

  return (
    <img
      src={assetUrl(src)}
      alt={name}
      width={112}
      height={112}
      className={`${frame} object-cover`}
      onError={() => setFailed(true)}
    />
  )
}
