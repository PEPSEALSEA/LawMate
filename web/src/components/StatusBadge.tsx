import { cn } from '@/lib/cn'
import { statusLabel } from '@/lib/case-utils'
import type { CaseStatus } from '@/types'

const toneClasses: Record<CaseStatus, string> = {
  in_progress: 'bg-white/15 text-white',
  done: 'bg-success/20 text-success-ink',
  pending: 'bg-white/10 text-white/80',
}

const dotClasses: Record<CaseStatus, string> = {
  in_progress: 'bg-brand-200',
  done: 'bg-success',
  pending: 'bg-white/50',
}

export function StatusBadge({ status, light = true }: { status: CaseStatus; light?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        light ? toneClasses[status] : 'bg-brand-50 text-brand-700',
      )}
    >
      <span className={cn('size-1.5 rounded-full', light ? dotClasses[status] : 'bg-brand-500')} />
      {statusLabel(status)}
    </span>
  )
}
