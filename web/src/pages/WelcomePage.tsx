import { motion } from 'framer-motion'
import { ArrowRight, MessageCircleHeart, ScrollText, Search, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router'
import welcomeIllustration from '@/assets/welcome-illustration.webp'
import { routes } from '@/lib/routes'

const features = [
  { icon: MessageCircleHeart, label: 'ปรึกษากฎหมาย' },
  { icon: Search, label: 'ค้นหาข้อมูล' },
  { icon: ScrollText, label: 'รู้สิทธิของคุณ' },
  { icon: ShieldCheck, label: 'ปลอดภัย เป็นส่วนตัว' },
]

const illustrationBg = '#F7EEE0'

export function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(routes.app)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') navigate(routes.app)
      }}
      className="relative flex min-h-svh cursor-pointer flex-col items-center overflow-hidden"
      style={{ backgroundColor: illustrationBg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 15%, rgba(217,165,102,0.16), transparent 40%), radial-gradient(circle at 88% 12%, rgba(217,165,102,0.12), transparent 45%)',
        }}
      />

      <div className="relative flex w-full flex-1 flex-col items-center justify-center px-6 py-8 text-center sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#4A3421] sm:text-6xl">LawMate</h1>
          <p className="mt-1 text-base font-semibold text-[#8C6239] sm:text-xl">คู่หูด้านกฎหมาย</p>
          <p className="mt-2 text-sm leading-relaxed text-[#8C6239]/80 sm:mt-3 sm:text-base">
            เข้าใจกฎหมายง่ายขึ้น ใช้สิทธิได้มั่นใจในทุกเรื่อง
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-2 w-full max-w-[22rem] sm:mt-0 sm:max-w-md"
        >
          <img
            src={welcomeIllustration}
            alt="ตัวการ์ตูนทนายความน่ารักถือหนังสือกฎหมาย ยืนอยู่หน้าตาชั่งและกองหนังสือกฎหมาย"
            className="mx-auto h-auto max-h-[42vh] w-full object-contain sm:max-h-[48vh]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute top-6 left-2 max-w-[9.5rem] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-left shadow-md shadow-[#8C6239]/15 sm:top-10 sm:left-6"
          >
            <p className="text-xs leading-snug font-medium text-[#4A3421]">
              ไม่ว่าปัญหาอะไร เราพร้อมช่วยคุณ
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="mt-4 sm:mt-6"
        >
          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              navigate(routes.app)
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#4A3421] px-8 py-4 text-base font-semibold text-[#FBF3E7] shadow-lg shadow-[#4A3421]/25 transition-colors hover:bg-[#3a2819]"
          >
            เริ่มต้นใช้งาน
            <ArrowRight className="size-5" aria-hidden />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="mt-6 grid w-full max-w-md grid-cols-4 gap-2 sm:mt-8 sm:gap-4"
        >
          {features.map((feature) => (
            <div key={feature.label} className="flex flex-col items-center gap-2">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/70 text-[#8C6239] shadow-sm shadow-[#8C6239]/10 sm:size-14">
                <feature.icon className="size-5 sm:size-6" aria-hidden />
              </span>
              <p className="text-[11px] leading-tight font-medium text-[#4A3421]/80 sm:text-xs">
                {feature.label}
              </p>
            </div>
          ))}
        </motion.div>

        <p className="mt-6 text-xs text-[#8C6239]/60 sm:mt-8">แตะที่ไหนก็ได้เพื่อเริ่มต้น</p>
      </div>
    </div>
  )
}
