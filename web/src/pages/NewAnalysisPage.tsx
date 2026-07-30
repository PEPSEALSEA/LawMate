import { useState, type FormEvent } from 'react'
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { generateCaseFromSituation } from '@/data/caseTemplates'
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
      navigate(`/cases/${newCase.id}`)
    }, 900)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link to="/cases" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft className="size-4" aria-hidden />
        กลับไปที่เคสทั้งหมด
      </Link>

      <div className="mt-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-md shadow-brand-700/20">
          <Sparkles className="size-6" aria-hidden />
        </span>
        <h1 className="mt-4 text-xl font-bold text-ink sm:text-2xl">บอกสถานการณ์ของคุณ</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          พิมพ์เล่าปัญหาที่คุณเจอด้วยภาษาพูดธรรมดา ไม่ต้องรู้ศัพท์กฎหมาย LawMate จะวิเคราะห์สิทธิ
          สร้างแผนดำเนินการ และร่างเอกสารให้คุณ
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            rows={6}
            placeholder="เช่น นายจ้างไม่จ่ายค่าล่วงเวลาให้ทั้งที่ทำงานเกินเวลาทุกวัน..."
            className="w-full resize-none rounded-2xl border border-black/10 p-4 text-sm leading-relaxed text-ink outline-none focus:border-brand-500"
          />

          <button
            type="submit"
            disabled={!situation.trim() || loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-700/20 transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                กำลังวิเคราะห์สถานการณ์...
              </>
            ) : (
              <>
                <Sparkles className="size-4" aria-hidden />
                วิเคราะห์สถานการณ์
              </>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-black/5 pt-5">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">ตัวอย่างสถานการณ์</p>
          <div className="mt-3 flex flex-col gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setSituation(example)}
                className="rounded-xl bg-surface px-4 py-3 text-left text-sm text-ink/80 transition-colors hover:bg-brand-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
