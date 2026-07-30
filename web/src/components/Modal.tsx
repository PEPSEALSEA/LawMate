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
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden />

      <div
        className={cn(
          'relative flex max-h-[88svh] w-full flex-col rounded-t-3xl bg-white shadow-2xl sm:max-h-[80svh] sm:rounded-3xl',
          widthClassName ?? 'sm:max-w-lg',
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/5 px-6 py-5">
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
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink"
            aria-label="ปิด"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
