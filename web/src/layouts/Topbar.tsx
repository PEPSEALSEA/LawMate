import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, LogOut, Settings, User } from 'lucide-react'
import { Link } from 'react-router'
import { BrandLogo } from '@/components/BrandLogo'
import { routes } from '@/lib/routes'
import { useAlerts } from '@/state/AlertsContext'
import { useProfile } from '@/state/ProfileContext'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function Topbar() {
  const { unreadCount } = useAlerts()
  const { profile } = useProfile()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex h-14 items-center justify-between px-4 lg:h-16 lg:justify-end lg:px-2 lg:pt-1">
      <Link to={routes.app} className="flex items-center lg:hidden" aria-label="LawMate">
        <BrandLogo imgClassName="h-11 w-auto" />
      </Link>

      <div className="flex items-center gap-2 rounded-full bg-panel/80 p-1.5 shadow-sm ring-1 ring-ink/6 backdrop-blur-md">
        <Link
          to={routes.alerts}
          className="relative flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand-50 hover:text-ink"
          aria-label="การแจ้งเตือน"
        >
          <Bell className="size-[18px]" aria-hidden />
          <AnimatePresence>
            {unreadCount > 0 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-urgent text-[10px] font-bold text-white"
              >
                {unreadCount}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </Link>

        <div className="relative">
          <motion.button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex size-9 items-center justify-center rounded-full bg-brand-700 text-xs font-semibold text-brand-50"
            aria-label="เมนูผู้ใช้"
          >
            {initials(profile.name)}
          </motion.button>

          <AnimatePresence>
            {menuOpen ? (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} aria-hidden />
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-ink/8 bg-panel py-1.5 shadow-xl shadow-brand-900/10"
                >
                  <div className="border-b border-ink/8 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-ink">{profile.name}</p>
                    <p className="truncate text-xs text-muted">{profile.email}</p>
                  </div>
                  <Link
                    to={routes.profile}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-surface"
                  >
                    <User className="size-4 text-muted" aria-hidden />
                    โปรไฟล์
                  </Link>
                  <Link
                    to={routes.settings}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-surface"
                  >
                    <Settings className="size-4 text-muted" aria-hidden />
                    ตั้งค่า
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-urgent hover:bg-urgent/5"
                  >
                    <LogOut className="size-4" aria-hidden />
                    ออกจากระบบ
                  </button>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
