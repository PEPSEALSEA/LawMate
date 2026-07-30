import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { formatThaiDate, getDaysLeft, getProgress } from '@/lib/case-utils'
import type { LegalCase } from '@/types'

export function CaseHero({ legalCase }: { legalCase: LegalCase }) {
  const progress = getProgress(legalCase)
  const daysLeft = getDaysLeft(legalCase.dueDate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl bg-brand-900 p-6 shadow-xl shadow-brand-900/20 sm:p-8"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(251,243,231,0.12), transparent 40%), radial-gradient(circle at 85% 90%, rgba(166,124,82,0.35), transparent 45%)',
        }}
      />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="flex flex-wrap items-center gap-2"
        >
          <StatusBadge status={legalCase.status} />
          <span className="text-xs font-medium text-brand-100/70">{legalCase.referenceCode}</span>
          <span className="text-xs text-brand-100/40">•</span>
          <span className="text-xs font-medium text-brand-100/70">{legalCase.category}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-3 text-2xl font-bold text-white sm:text-3xl"
        >
          {legalCase.title}
        </motion.h1>
        {legalCase.subtitle ? (
          <p className="mt-1 text-sm text-brand-100/60">{legalCase.subtitle}</p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="mt-6 rounded-2xl bg-panel/[0.07] p-4 ring-1 ring-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Calendar className="size-4 text-brand-200" aria-hidden />
              กำหนดดำเนินการ: {formatThaiDate(legalCase.dueDate)}
            </div>
            <span
              className={
                daysLeft <= 3
                  ? 'rounded-full bg-urgent/90 px-3 py-1 text-xs font-semibold text-white'
                  : 'rounded-full bg-panel/15 px-3 py-1 text-xs font-semibold text-white'
              }
            >
              {daysLeft > 0 ? `เหลือเวลาอีก ${daysLeft} วัน` : 'เลยกำหนดเวลาแล้ว'}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-panel/15">
              <motion.div
                className="h-full rounded-full bg-success"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="text-xs font-semibold tabular-nums text-white">{progress}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
