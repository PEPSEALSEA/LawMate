import { Check } from 'lucide-react'
import { useCases } from '@/state/CasesContext'
import { cn } from '@/lib/cn'
import type { LegalCase } from '@/types'

export function ActionPlan({ legalCase }: { legalCase: LegalCase }) {
  const { advanceStep } = useCases()

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-ink">แผนการดำเนินการ (Action Plan)</h2>

      <ol className="mt-6 space-y-0">
        {legalCase.steps.map((step, index) => {
          const isLast = index === legalCase.steps.length - 1

          return (
            <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-8 left-[15px] h-[calc(100%-2rem)] w-0.5',
                    step.status === 'done' ? 'bg-success' : 'bg-black/10',
                  )}
                />
              ) : null}

              <span
                className={cn(
                  'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  step.status === 'done' && 'bg-success text-white',
                  step.status === 'current' && 'border-2 border-brand-700 bg-white text-brand-700',
                  step.status === 'pending' && 'bg-black/5 text-muted',
                )}
              >
                {step.status === 'done' ? <Check className="size-4" aria-hidden /> : index + 1}
              </span>

              <div
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
                  {step.status === 'done' ? 'Done' : step.status === 'current' ? 'In Progress' : 'Pending'}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {step.status === 'pending' ? `รอเสร็จสิ้นขั้นตอนที่ ${index}` : step.detail}
                </p>

                {step.status === 'current' ? (
                  <button
                    type="button"
                    onClick={() => advanceStep(legalCase.id, step.id)}
                    className="mt-3 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
                  >
                    ดำเนินการต่อ (Continue)
                  </button>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
