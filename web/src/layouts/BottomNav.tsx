import { motion } from 'framer-motion'
import { NavLink } from 'react-router'
import { bottomNavItems } from '@/layouts/navItems'
import { routes } from '@/lib/routes'
import { useAlerts } from '@/state/AlertsContext'
import { cn } from '@/lib/cn'

export function BottomNav() {
  const { unreadCount } = useAlerts()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 bg-panel/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {bottomNavItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className="relative">
            {({ isActive }) => (
              <span
                className={cn(
                  'relative flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-medium transition-colors',
                  isActive ? 'text-brand-700' : 'text-muted',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="bottom-nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-brand-100"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                ) : null}
                <motion.span whileTap={{ scale: 0.85 }} className="relative">
                  <item.icon className="size-5" aria-hidden />
                  {item.to === routes.alerts && unreadCount > 0 ? (
                    <span className="absolute -top-1 -right-1.5 size-2 rounded-full bg-urgent" />
                  ) : null}
                </motion.span>
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
