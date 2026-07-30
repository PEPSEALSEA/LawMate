import { AlertTriangle, HelpCircle, Lock, TrendingDown } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { painPoint } from '@/data/content'

const reasons = [
  {
    icon: HelpCircle,
    title: 'ไม่รู้ว่ามีสิทธิ',
    body: 'ข้อมูลกฎหมายกระจัดกระจาย อ่านแล้วไม่แน่ใจว่าใช้กับสถานการณ์ของตัวเองได้หรือไม่',
  },
  {
    icon: Lock,
    title: 'เข้าถึงยาก',
    body: 'ภาษากฎหมายซับซ้อน ต้องตีความ และไม่รู้ว่าต้องติดต่อหน่วยงานไหน',
  },
  {
    icon: TrendingDown,
    title: 'ไม่รู้จะเริ่มตรงไหน',
    body: 'แม้รู้สิทธิ แต่ไม่รู้ขั้นตอน หลักฐาน หรือกำหนดเวลาที่ต้องทำตาม',
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={painPoint.eyebrow} title={painPoint.title} body={painPoint.body} />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-black/5 bg-surface p-6 shadow-sm"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-urgent/10 text-urgent">
                <reason.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{reason.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-urgent/20 bg-urgent/5 p-5">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-urgent" aria-hidden />
          <p className="text-sm leading-relaxed text-ink/80">
            ผลลัพธ์: คนไทยจำนวนมาก <span className="font-semibold">“เสียสิทธิ”</span> ของตัวเองไปเงียบๆ
            ทั้งที่กฎหมายคุ้มครองอยู่แล้ว เพียงเพราะไม่รู้ว่าต้องทำอะไรต่อ
          </p>
        </div>
      </div>
    </section>
  )
}
