import { cn } from '@/lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  tone = 'light',
  className,
}: {
  eyebrow?: string
  title: string
  body?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
            tone === 'dark' ? 'bg-white/10 text-brand-100' : 'bg-brand-50 text-brand-700',
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          'mt-4 text-3xl font-bold tracking-tight sm:text-4xl',
          tone === 'dark' ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-brand-100/80' : 'text-muted',
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  )
}
