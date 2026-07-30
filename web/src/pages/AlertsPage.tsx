import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, BellOff, CheckCheck } from 'lucide-react'
import { Link } from 'react-router'
import { useAlerts } from '@/state/AlertsContext'

export function AlertsPage() {
  const { alerts, markRead, markAllRead } = useAlerts()

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">การแจ้งเตือน</h1>
          <p className="mt-1 text-sm text-muted">กำหนดเวลาสำคัญและขั้นตอนด่วนจากเคสของคุณ</p>
        </div>
        {alerts.length > 0 ? (
          <motion.button
            type="button"
            onClick={markAllRead}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-ink hover:bg-surface"
          >
            <CheckCheck className="size-4" aria-hidden />
            ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
          </motion.button>
        ) : null}
      </div>

      <div className="mt-6 space-y-3">
        {alerts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white py-16 text-center"
          >
            <BellOff className="size-8 text-muted" aria-hidden />
            <p className="text-sm text-muted">ยังไม่มีการแจ้งเตือนในตอนนี้</p>
          </motion.div>
        ) : (
          <AnimatePresence initial={false}>
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  to={`/cases/${alert.caseId}`}
                  onClick={() => markRead(alert.id)}
                  className="flex items-start gap-3 rounded-2xl border border-urgent/20 bg-urgent/5 p-4 transition-colors hover:bg-urgent/10"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-urgent/15 text-urgent">
                    <AlertTriangle className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{alert.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink/70">{alert.message}</p>
                    <p className="mt-1 text-xs font-medium text-muted">{alert.caseTitle}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
