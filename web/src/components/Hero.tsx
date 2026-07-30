import { ArrowRight, Sparkles } from 'lucide-react'
import desktopMockup from '@/assets/desktop-mockup.png'
import mobileMockup from '@/assets/mobile-mockup.png'
import { trustStats } from '@/data/content'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_theme(colors.brand.700/.55),_transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-brand-500/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pt-16 pb-24 lg:grid-cols-2 lg:items-center lg:pt-24 lg:pb-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100">
            <Sparkles className="size-4" aria-hidden />
            ตัวช่วยกฎหมายสำหรับคนไทยทุกคน
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            เจอปัญหากฎหมาย ไม่ต้องรู้ว่าจะเริ่มตรงไหน
            <span className="text-brand-200"> ให้ LawMate บอกคุณ</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100/80">
            แค่บอกสถานการณ์ของคุณ ไม่ว่าจะเรื่องงาน บ้าน รถ หรือสัญญา LawMate
            วิเคราะห์สิทธิ สร้างแผนดำเนินการ และร่างเอกสารที่พร้อมใช้งานให้ทันที
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-900 shadow-xl shadow-black/20 transition-transform hover:scale-[1.02]"
            >
              เริ่มวิเคราะห์เคสของคุณ
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              ดูวิธีทำงาน
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</dd>
                <p className="mt-1 text-xs text-brand-100/70 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm lg:ml-10">
            <img
              src={desktopMockup}
              alt="ตัวอย่างหน้าจอ LawMate เวอร์ชันเดสก์ท็อป แสดงภาพรวมคดีและแผนดำเนินการ"
              className="w-full rounded-xl"
            />
          </div>
          <div className="absolute -bottom-10 -left-6 w-36 rotate-[-4deg] rounded-[1.75rem] border-4 border-white/90 bg-white shadow-2xl shadow-black/40 sm:-left-10 sm:w-44">
            <img
              src={mobileMockup}
              alt="ตัวอย่างหน้าจอ LawMate เวอร์ชันมือถือ แสดงเมนูทางลัดและแผนดำเนินการ"
              className="w-full rounded-[1.4rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
