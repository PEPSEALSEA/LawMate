import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { useCase } from '@/data/content'

export function UseCaseSection() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={useCase.eyebrow} title={useCase.title} align="center" className="mx-auto" />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-urgent/10 text-urgent">
              <useCase.before.icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{useCase.before.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{useCase.before.body}</p>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <span className="flex size-12 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-700/30">
              <ArrowRight className="size-5" aria-hidden />
            </span>
          </div>

          <div className="rounded-3xl border border-brand-700/15 bg-brand-900 p-8 text-white shadow-lg shadow-brand-900/20">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-brand-100">
              <useCase.after.icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{useCase.after.title}</h3>
            <ul className="mt-4 space-y-3">
              {useCase.after.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-50">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-200" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
