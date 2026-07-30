import { SectionHeading } from '@/components/SectionHeading'
import { howItWorks } from '@/data/content'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="วิธีทำงาน"
          title="จากปัญหา สู่แผนดำเนินการ ใน 4 ขั้นตอน"
          body="LawMate ไม่ได้หยุดแค่อธิบายกฎหมาย แต่พาคุณไปถึงขั้นตอนที่ต้องลงมือทำจริง"
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute top-11 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block"
          />
          {howItWorks.map((item) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex size-[4.5rem] items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/5 ring-1 ring-black/5">
                <item.icon className="size-7 text-brand-700" aria-hidden />
                <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand-700 text-[11px] font-bold text-white">
                  {item.step}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
