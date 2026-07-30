import { Plus, Scale } from 'lucide-react'
import { Link } from 'react-router'

export function EmptyState({
  title,
  body,
  ctaLabel = 'เริ่มวิเคราะห์เคสใหม่',
  ctaTo = '/cases/new',
}: {
  title: string
  body: string
  ctaLabel?: string
  ctaTo?: string
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-700/10 text-brand-700">
        <Scale className="size-8" aria-hidden />
      </span>
      <h1 className="text-xl font-bold text-ink">{title}</h1>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
      <Link
        to={ctaTo}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-700/20 hover:bg-brand-800"
      >
        <Plus className="size-4" aria-hidden />
        {ctaLabel}
      </Link>
    </div>
  )
}
