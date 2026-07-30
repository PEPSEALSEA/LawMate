import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useCases } from '@/state/CasesContext'
import { cn } from '@/lib/cn'
import type { LegalCase } from '@/types'

export function ActionPlan({ legalCase }: { legalCase: LegalCase }) {
  const { advanceStep } = useCases()

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-ink">แผนดำเนินการ</h2>
      <p className="mt-1 text-sm text-muted">ทำตามขั้นตอนทีละข้อ ระบบจะปลดล็อกขั้นถัดไปให้อัตโนมัติ</p>

      <ol className="mt-6 space-y-0">
        {legalCase.steps.map((step, index) => {
          const isLast = index === legalCase.steps.length - 1

          return (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {!isLast ? (
                <span
                  aria-hidden
                  className="absolute top-8 left-[15px] h-[calc(100%-2rem)] w-0.5 bg-black/10"
                >
                  <motion.span
                    className="block w-full bg-success"
                    initial={{ height: 0 }}
                    animate={{ height: step.status === 'done' ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </span>
              ) : null}

              <span
                className={cn(
                  'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300',
                  step.status === 'done' && 'bg-success text-white',
                  step.status === 'current' && 'border-2 border-brand-700 bg-white text-brand-700',
                  step.status === 'pending' && 'bg-black/5 text-muted',
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {step.status === 'done' ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <Check className="size-4" aria-hidden />
                    </motion.span>
                  ) : (
                    <motion.span key="num" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      {index + 1}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>

              <motion.div
                layout
                className={cn(
                  'flex-1 rounded-xl px-1 pt-0.5',
                  step.status === 'current' && 'rounded-xl border border-brand-200 bg-brand-50 p-4',
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      step.status === 'pending' ? 'text-muted' : 'text-ink',
                    )}
                  >
                    {step.title}
                  </p>
                  {step.urgent && step.status === 'current' ? (
                    <span className="rounded-full bg-urgent/15 px-2 py-0.5 text-[11px] font-semibold text-urgent">
                      ด่วน
                    </span>
                  ) : null}
                </div>
                <p
                  className={cn(
                    'text-xs font-medium',
                    step.status === 'done' && 'text-success-ink',
                    step.status === 'current' && 'text-brand-700',
                    step.status === 'pending' && 'text-muted',
                  )}
                >
                  {step.status === 'done' ? 'เสร็จแล้ว' : step.status === 'current' ? 'กำลังทำขั้นตอนนี้' : 'ยังไม่ถึงคิว'}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {step.status === 'pending' ? 'รอให้ทำขั้นตอนก่อนหน้าเสร็จก่อน' : step.detail}
                </p>

                {step.status === 'current' ? (
                  <motion.button
                    type="button"
                    onClick={() => advanceStep(legalCase.id, step.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-3 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
                  >
                    ทำขั้นตอนนี้เสร็จแล้ว →
                  </motion.button>
                ) : null}
              </motion.div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
