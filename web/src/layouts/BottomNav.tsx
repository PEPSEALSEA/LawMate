import { NavLink } from 'react-router'
import { bottomNavItems } from '@/layouts/navItems'
import { useAlerts } from '@/state/AlertsContext'
import { cn } from '@/lib/cn'

export function BottomNav() {
  const { unreadCount } = useAlerts()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'relative flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-medium transition-colors',
                isActive ? 'bg-success/15 text-success-ink' : 'text-muted',
              )
            }
          >
            <span className="relative">
              <item.icon className="size-5" aria-hidden />
              {item.to === '/alerts' && unreadCount > 0 ? (
                <span className="absolute -top-1 -right-1.5 size-2 rounded-full bg-urgent" />
              ) : null}
            </span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
