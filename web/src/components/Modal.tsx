import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
  widthClassName?: string
}

export function Modal({ open, onClose, title, subtitle, icon, children, widthClassName }: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative flex max-h-[88svh] w-full flex-col rounded-t-3xl bg-panel shadow-2xl sm:max-h-[80svh] sm:rounded-3xl',
              widthClassName ?? 'sm:max-w-lg',
            )}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink/8 px-6 py-5">
              <div className="flex items-center gap-3">
                {icon ? (
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-700/10 text-brand-700">
                    {icon}
                  </span>
                ) : null}
                <div>
                  <h2 className="text-base font-bold text-ink">{title}</h2>
                  {subtitle ? <p className="text-xs text-muted">{subtitle}</p> : null}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
                aria-label="ปิด"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
