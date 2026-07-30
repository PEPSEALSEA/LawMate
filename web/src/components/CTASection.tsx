import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section id="cta" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-8 py-16 text-center shadow-2xl shadow-brand-700/30 sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-10 size-64 rounded-full bg-brand-500/40 blur-3xl"
          />
          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ให้ความยุติธรรมเข้าถึงคุณ ง่ายเหมือนการ Google
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-brand-50/90 sm:text-lg">
            บอกสถานการณ์ของคุณวันนี้ แล้วให้ LawMate วิเคราะห์สิทธิ วางแผน และร่างเอกสารให้
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition-transform hover:scale-[1.02]"
            >
              เริ่มใช้งานฟรี
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
