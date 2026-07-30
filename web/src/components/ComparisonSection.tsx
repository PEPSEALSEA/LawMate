import { Check, Minus, Scale } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { comparison } from '@/data/content'
import { cn } from '@/lib/cn'

export function ComparisonSection() {
  return (
    <section id="difference" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="จุดต่างจาก ChatGPT"
          title="ไม่ใช่แค่บอกว่า “กฎหมายว่าอะไร” แต่บอกว่า “คุณต้องทำอะไร”"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-surface p-8">
            <h3 className="text-lg font-semibold text-muted">{comparison.chatgpt.title}</h3>
            <ul className="mt-6 space-y-4">
              {comparison.chatgpt.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted">
                  <Minus className="mt-0.5 size-4 shrink-0 text-muted/60" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              'relative overflow-hidden rounded-3xl border border-brand-700/20 bg-brand-900 p-8 shadow-xl shadow-brand-900/20',
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-brand-500/30 blur-3xl"
            />
            <div className="relative flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-white text-brand-700">
                <Scale className="size-4" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-white">{comparison.lawmate.title}</h3>
            </div>
            <ul className="relative mt-6 space-y-4">
              {comparison.lawmate.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-brand-50">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
