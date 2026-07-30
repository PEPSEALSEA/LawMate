import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { generateCaseFromSituation } from '@/data/caseTemplates'
import { routes } from '@/lib/routes'
import { useCases } from '@/state/CasesContext'

const examples = [
  'นายจ้างไม่จ่ายค่าล่วงเวลาให้ทั้งที่ทำงานเกิน 8 ชั่วโมงทุกวันมา 3 เดือนแล้ว',
  'ย้ายออกจากคอนโดแล้วแต่เจ้าของห้องไม่คืนเงินมัดจำให้ อ้างว่ามีรอยขีดข่วนเล็กน้อย',
  'รถถูกชนท้ายตอนจอดติดไฟแดง คู่กรณีไม่ยอมรับผิดและไม่ติดต่อกลับ',
]

export function NewAnalysisPage() {
  const [situation, setSituation] = useState('')
  const [loading, setLoading] = useState(false)
  const { addCase } = useCases()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!situation.trim() || loading) return

    setLoading(true)
    setTimeout(() => {
      const newCase = generateCaseFromSituation(situation.trim())
      addCase(newCase)
      setLoading(false)
      navigate(routes.caseDetail(newCase.id))
    }, 900)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link to={routes.cases} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft className="size-4" aria-hidden />
        กลับไปที่เคสทั้งหมด
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 rounded-3xl border border-ink/8 bg-panel p-6 shadow-sm sm:p-8"
      >
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
          className="flex size-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-md shadow-brand-700/20"
        >
          <Sparkles className="size-6" aria-hidden />
        </motion.span>
        <h1 className="mt-4 text-xl font-bold text-ink sm:text-2xl">เล่าปัญหาของคุณให้ฟังหน่อย</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          พิมพ์เล่าเรื่องด้วยภาษาพูดธรรมดา ไม่ต้องรู้ศัพท์กฎหมายก็ได้ LawMate จะช่วยดูว่าคุณมีสิทธิอะไร
          ต้องทำอะไรต่อ และช่วยร่างเอกสารให้
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            rows={6}
            placeholder="เช่น นายจ้างไม่จ่ายค่าล่วงเวลาให้ทั้งที่ทำงานเกินเวลาทุกวัน..."
            className="w-full resize-none rounded-2xl border border-ink/12 p-4 text-sm leading-relaxed text-ink outline-none transition-colors focus:border-brand-500"
          />

          <motion.button
            type="submit"
            disabled={!situation.trim() || loading}
            whileHover={situation.trim() && !loading ? { scale: 1.015 } : undefined}
            whileTap={situation.trim() && !loading ? { scale: 0.985 } : undefined}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-700/20 transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                กำลังวิเคราะห์ให้อยู่...
              </>
            ) : (
              <>
                <Sparkles className="size-4" aria-hidden />
                เริ่มวิเคราะห์
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 border-t border-ink/8 pt-5">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">ลองเลือกตัวอย่างดูก่อนก็ได้</p>
          <div className="mt-3 flex flex-col gap-2">
            {examples.map((example, index) => (
              <motion.button
                key={example}
                type="button"
                onClick={() => setSituation(example)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.08, duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="rounded-xl bg-surface px-4 py-3 text-left text-sm text-ink/80 transition-colors hover:bg-brand-50"
              >
                {example}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
