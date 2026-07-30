import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router'
import { BottomNav } from '@/layouts/BottomNav'
import { Sidebar } from '@/layouts/Sidebar'
import { Topbar } from '@/layouts/Topbar'

export function AppShell() {
  const location = useLocation()

  return (
    <div className="min-h-svh bg-surface lg:p-3">
      <div className="flex min-h-svh lg:min-h-[calc(100svh-1.5rem)] lg:gap-3">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden lg:rounded-[1.75rem] lg:bg-panel/55 lg:shadow-[0_8px_30px_rgba(61,42,28,0.04)] lg:ring-1 lg:ring-ink/6">
          <Topbar />
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
