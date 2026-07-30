import { motion } from 'framer-motion'
import { ArrowRight, MessageCircleHeart, ScrollText, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import welcomeIllustration from '@/assets/welcome-illustration.webp'
import { routes } from '@/lib/routes'

const features = [
  { icon: MessageCircleHeart, label: 'ปรึกษากฎหมาย' },
  { icon: Search, label: 'ค้นหาข้อมูล' },
  { icon: ScrollText, label: 'รู้สิทธิของคุณ' },
  { icon: ShieldCheck, label: 'ปลอดภัย เป็นส่วนตัว' },
]

export function WelcomePage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center overflow-hidden bg-[#FBF3E7]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 15%, rgba(217,165,102,0.18), transparent 40%), radial-gradient(circle at 88% 20%, rgba(217,165,102,0.14), transparent 45%), radial-gradient(circle at 50% 95%, rgba(140,98,57,0.1), transparent 50%)',
        }}
      />

      <div className="relative flex w-full max-w-md flex-1 flex-col items-center px-6 py-10 text-center sm:max-w-lg sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl font-bold tracking-tight text-[#4A3421] sm:text-6xl">LawMate</h1>
          <p className="mt-1 text-lg font-semibold text-[#8C6239] sm:text-xl">คู่หูด้านกฎหมาย</p>
          <p className="mt-3 text-sm leading-relaxed text-[#8C6239]/80 sm:text-base">
            เข้าใจกฎหมายง่ายขึ้น ใช้สิทธิได้มั่นใจในทุกเรื่อง
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 w-full max-w-xs sm:max-w-sm"
        >
          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[2.5rem] shadow-xl shadow-[#8C6239]/15">
            <img
              src={welcomeIllustration}
              alt="ตัวการ์ตูนทนายความน่ารักถือหนังสือกฎหมาย ยืนอยู่หน้าตาชั่งและกองหนังสือกฎหมาย"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute -top-3 -left-3 max-w-[9.5rem] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-left shadow-md shadow-[#8C6239]/15 sm:-left-6"
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
          className="mt-6"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={routes.app}
              className="inline-flex items-center gap-2 rounded-full bg-[#4A3421] px-8 py-4 text-base font-semibold text-[#FBF3E7] shadow-lg shadow-[#4A3421]/25 transition-colors hover:bg-[#3a2819]"
            >
              เริ่มต้นใช้งาน
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="mt-10 grid w-full grid-cols-4 gap-2 sm:gap-4"
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
      </div>
    </div>
  )
}
