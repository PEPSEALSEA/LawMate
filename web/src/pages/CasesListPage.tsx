import { motion } from 'framer-motion'
import { ChevronRight, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { formatThaiDate, getDaysLeft, getProgress } from '@/lib/case-utils'
import { useCases } from '@/state/CasesContext'

export function CasesListPage() {
  const { cases } = useCases()

  if (cases.length === 0) {
    return (
      <EmptyState
        title="ยังไม่มีเคสที่วิเคราะห์"
        body="เริ่มต้นด้วยการบอกสถานการณ์ของคุณ แล้วให้ LawMate วิเคราะห์สิทธิและสร้างแผนดำเนินการให้"
      />
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">เคสของฉัน</h1>
          <p className="mt-1 text-sm text-muted">ปัญหากฎหมายทั้งหมดที่คุณกำลังจัดการอยู่</p>
        </div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/cases/new"
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-700/20 hover:bg-brand-800"
          >
            <Plus className="size-4" aria-hidden />
            วิเคราะห์เคสใหม่
          </Link>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cases.map((legalCase, index) => {
          const progress = getProgress(legalCase)
          const daysLeft = getDaysLeft(legalCase.dueDate)

          return (
            <motion.div
              key={legalCase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
            >
              <Link
                to={`/cases/${legalCase.id}`}
                className="group flex flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <StatusBadge status={legalCase.status} light={false} />
                  <ChevronRight
                    className="size-5 text-muted transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </div>

                <h2 className="mt-3 text-base font-bold text-ink">{legalCase.title}</h2>
                <p className="mt-1 text-xs text-muted">
                  {legalCase.referenceCode} • {legalCase.category}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/5">
                    <motion.div
                      className="h-full rounded-full bg-brand-700"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-muted">{progress}%</span>
                </div>

                <p className="mt-3 text-xs text-muted">
                  กำหนดดำเนินการ {formatThaiDate(legalCase.dueDate)} •{' '}
                  {daysLeft > 0 ? `เหลือ ${daysLeft} วัน` : 'เลยกำหนดแล้ว'}
                </p>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
