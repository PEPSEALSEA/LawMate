import { useState } from 'react'
import { Bell, LogOut, Scale, Settings, User } from 'lucide-react'
import { Link } from 'react-router'
import { useAlerts } from '@/state/AlertsContext'
import { cn } from '@/lib/cn'

export function Topbar() {
  const { unreadCount } = useAlerts()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex h-16 items-center justify-between border-b border-black/5 bg-white px-4 lg:h-20 lg:justify-end lg:px-8">
      <Link to="/" className="flex items-center gap-2 font-bold text-ink lg:hidden">
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand-700 text-white">
          <Scale className="size-4" aria-hidden />
        </span>
        LawMate AI
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/alerts"
          className="relative flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
          aria-label="การแจ้งเตือน"
        >
          <Bell className="size-5" aria-hidden />
          {unreadCount > 0 ? (
            <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-urgent text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          ) : null}
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white"
          >
            JD
          </button>

          {menuOpen ? (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
                aria-hidden
              />
              <div
                className={cn(
                  'absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-black/5 bg-white py-1.5 shadow-xl shadow-black/10',
                )}
              >
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-surface"
                >
                  <User className="size-4 text-muted" aria-hidden />
                  โปรไฟล์
                </Link>
                <Link
                  to="/settings"
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
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}
