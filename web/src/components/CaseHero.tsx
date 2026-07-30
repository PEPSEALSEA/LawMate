import { Calendar } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { formatThaiDate, getDaysLeft, getProgress } from '@/lib/case-utils'
import type { LegalCase } from '@/types'

export function CaseHero({ legalCase }: { legalCase: LegalCase }) {
  const progress = getProgress(legalCase)
  const daysLeft = getDaysLeft(legalCase.dueDate)

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 p-6 shadow-lg shadow-brand-900/20 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-brand-500/30 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={legalCase.status} />
            <span className="text-xs font-medium text-brand-100/70">{legalCase.referenceCode}</span>
            <span className="text-xs text-brand-100/50">•</span>
            <span className="text-xs font-medium text-brand-100/70">{legalCase.category}</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{legalCase.title}</h1>
          {legalCase.subtitle ? (
            <p className="mt-1 text-sm text-brand-100/70">{legalCase.subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="relative mt-6 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Calendar className="size-4 text-brand-200" aria-hidden />
            กำหนดส่ง: {formatThaiDate(legalCase.dueDate)}
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            {daysLeft > 0 ? `เหลืออีก ${daysLeft} วัน` : 'เลยกำหนดแล้ว'}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-success transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-white">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
