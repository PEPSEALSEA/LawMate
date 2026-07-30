import { motion } from 'framer-motion'
import { Plus, Scale } from 'lucide-react'
import { NavLink } from 'react-router'
import { sidebarNavItems } from '@/layouts/navItems'
import { cn } from '@/lib/cn'

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-black/5 bg-white lg:flex">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md shadow-brand-700/20">
          <Scale className="size-5" aria-hidden />
        </span>
        <div>
          <p className="text-base font-bold leading-tight text-ink">LawMate AI</p>
          <p className="text-xs leading-tight text-muted">Legal Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {sidebarNavItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className="relative block">
            {({ isActive }) => (
              <span
                className={cn(
                  'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'text-brand-700' : 'text-muted hover:text-ink',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-brand-50"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                ) : null}
                <item.icon className="size-[18px]" aria-hidden />
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink
            to="/cases/new"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-brand-700/20 transition-colors hover:bg-brand-800"
          >
            <Plus className="size-4" aria-hidden />
            วิเคราะห์เคสใหม่
          </NavLink>
        </motion.div>
      </div>
    </aside>
  )
}
