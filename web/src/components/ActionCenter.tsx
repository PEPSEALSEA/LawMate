import { motion } from 'framer-motion'
import { FileEdit, Sparkles, UploadCloud } from 'lucide-react'
import { cn } from '@/lib/cn'

interface ActionCenterProps {
  onDraftDocument: () => void
  onUploadEvidence: () => void
  onConsultAI: () => void
  activeAction: 'draft' | 'upload' | 'consult' | null
}

export function ActionCenter({
  onDraftDocument,
  onUploadEvidence,
  onConsultAI,
  activeAction,
}: ActionCenterProps) {
  const items = [
    {
      key: 'draft' as const,
      icon: FileEdit,
      title: 'ร่างเอกสาร',
      subtitle: 'ให้ AI ช่วยร่างหนังสือให้ทันที',
      onClick: onDraftDocument,
    },
    {
      key: 'upload' as const,
      icon: UploadCloud,
      title: 'แนบหลักฐาน',
      subtitle: 'อัปโหลดไฟล์ที่เกี่ยวข้องกับเคส',
      onClick: onUploadEvidence,
    },
    {
      key: 'consult' as const,
      icon: Sparkles,
      title: 'ปรึกษา AI',
      subtitle: 'ถามคำถามเกี่ยวกับเคสนี้ได้ตลอด',
      onClick: onConsultAI,
    },
  ]

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-ink">เครื่องมือช่วยเหลือ</h2>

      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const isActive = activeAction === item.key
          return (
            <motion.button
              key={item.key}
              type="button"
              onClick={item.onClick}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors duration-200',
                isActive ? 'bg-brand-900 text-white' : 'bg-surface text-ink hover:bg-brand-50',
              )}
            >
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200',
                  isActive ? 'bg-white/10 text-white' : 'bg-brand-700/10 text-brand-700',
                )}
              >
                <item.icon className="size-5" aria-hidden />
              </span>
              <span>
                <span
                  className={cn('block text-sm font-semibold', isActive ? 'text-white' : 'text-ink')}
                >
                  {item.title}
                </span>
                <span
                  className={cn('block text-xs', isActive ? 'text-brand-100/70' : 'text-muted')}
                >
                  {item.subtitle}
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
