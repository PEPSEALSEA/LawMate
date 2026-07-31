import { motion } from 'framer-motion'
import { ArrowRight, MessageCircleHeart, ScrollText, Search, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router'
import { BrandLogo } from '@/components/BrandLogo'
import { routes } from '@/lib/routes'

const features = [
  { icon: MessageCircleHeart, label: 'ปรึกษากฎหมาย' },
  { icon: Search, label: 'ค้นหาข้อมูล' },
  { icon: ScrollText, label: 'รู้สิทธิของคุณ' },
  { icon: ShieldCheck, label: 'ปลอดภัย เป็นส่วนตัว' },
]

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
      className="relative flex min-h-svh cursor-pointer flex-col items-center overflow-hidden bg-surface"
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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[20rem] sm:max-w-md"
        >
          <BrandLogo
            alt="LawMate — คู่หูด้านกฎหมาย"
            imgClassName="mx-auto max-h-[46vh] w-full object-contain sm:max-h-[52vh]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 sm:mt-4"
        >
          <p className="text-base font-semibold text-brand-600 sm:text-xl">คู่หูด้านกฎหมาย</p>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            เข้าใจกฎหมายง่ายขึ้น ใช้สิทธิได้มั่นใจในทุกเรื่อง
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="mt-5 sm:mt-7"
        >
          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              navigate(routes.app)
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-8 py-4 text-base font-semibold text-brand-50 shadow-lg shadow-brand-700/25 transition-colors hover:bg-brand-800"
          >
            เริ่มต้นใช้งาน
            <ArrowRight className="size-5" aria-hidden />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.45 }}
          className="mt-6 grid w-full max-w-md grid-cols-4 gap-2 sm:mt-8 sm:gap-4"
        >
          {features.map((feature) => (
            <div key={feature.label} className="flex flex-col items-center gap-2">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-panel/80 text-brand-600 shadow-sm shadow-brand-600/10 sm:size-14">
                <feature.icon className="size-5 sm:size-6" aria-hidden />
              </span>
              <p className="text-[11px] leading-tight font-medium text-ink/80 sm:text-xs">{feature.label}</p>
            </div>
          ))}
        </motion.div>

        <p className="mt-6 text-xs text-muted/70 sm:mt-8">แตะที่ไหนก็ได้เพื่อเริ่มต้น</p>
      </div>
    </div>
  )
}
