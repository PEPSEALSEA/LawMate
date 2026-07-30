import { SectionHeading } from '@/components/SectionHeading'
import { audiences, impact } from '@/data/content'

export function AudienceSection() {
  return (
    <section id="audience" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="กลุ่มเป้าหมาย"
          title="ทุกคนมีโอกาสเจอปัญหากฎหมายในชีวิตประจำวัน"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {audiences.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-surface px-4 py-8 text-center transition-colors hover:border-brand-200 hover:bg-brand-50"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-700/10 text-brand-700">
                <item.icon className="size-6" aria-hidden />
              </span>
              <p className="text-sm font-medium text-ink">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-brand-900 px-8 py-12 text-center sm:px-16">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand-100 uppercase">
            {impact.eyebrow}
          </span>
          <h3 className="mx-auto mt-4 max-w-2xl text-2xl font-bold text-white sm:text-3xl">
            {impact.title}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-100/80">
            {impact.body}
          </p>
        </div>
      </div>
    </section>
  )
}
