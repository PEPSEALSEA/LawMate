import { cn } from '@/lib/cn'
import { statusLabel } from '@/lib/case-utils'
import type { CaseStatus } from '@/types'

const toneClasses: Record<CaseStatus, string> = {
  in_progress: 'bg-panel/15 text-white',
  done: 'bg-success/20 text-success-ink',
  pending: 'bg-panel/10 text-white/80',
}

const dotClasses: Record<CaseStatus, string> = {
  in_progress: 'bg-brand-200 text-brand-200',
  done: 'bg-success text-success',
  pending: 'bg-panel/50 text-white/50',
}

export function StatusBadge({ status, light = true }: { status: CaseStatus; light?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium',
        light ? toneClasses[status] : 'bg-brand-50 text-brand-700',
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          light ? dotClasses[status] : 'bg-brand-500 text-brand-500',
          status === 'in_progress' && 'animate-pulse-ring',
        )}
      />
      {statusLabel(status)}
    </span>
  )
}
