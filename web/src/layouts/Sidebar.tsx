import { motion } from 'framer-motion'
import { Plus, Scale, Sparkles } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { sidebarNavItems } from '@/layouts/navItems'
import { cn } from '@/lib/cn'
import { routes } from '@/lib/routes'
import { useProfile } from '@/state/ProfileContext'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function Sidebar() {
  const { profile } = useProfile()

  return (
    <aside className="hidden w-[15.5rem] shrink-0 flex-col rounded-[1.75rem] bg-panel/90 p-3 shadow-[0_8px_30px_rgba(61,42,28,0.06)] ring-1 ring-ink/6 backdrop-blur-md lg:flex">
      <Link to={routes.app} className="mb-4 flex items-center gap-3 rounded-2xl px-2.5 py-2.5 transition-colors hover:bg-brand-50/80">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-700 text-brand-50 shadow-md shadow-brand-700/25">
          <Scale className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-display text-[1.05rem] leading-none font-bold text-ink">LawMate</p>
          <p className="mt-1 truncate text-[11px] text-muted">คู่หูด้านกฎหมาย</p>
        </div>
      </Link>

      <div className="mb-2 px-2.5">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-muted/70 uppercase">เมนู</p>
      </div>

      <nav className="flex-1 space-y-1">
        {sidebarNavItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className="relative block">
            {({ isActive }) => (
              <span
                className={cn(
                  'relative flex items-center gap-3 rounded-2xl px-2.5 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'text-brand-700' : 'text-muted hover:bg-brand-50/70 hover:text-ink',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 -z-10 rounded-2xl bg-brand-100 shadow-sm shadow-brand-700/5"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                ) : null}
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-xl transition-colors',
                    isActive ? 'bg-brand-700 text-brand-50' : 'bg-surface text-muted',
                  )}
                >
                  <item.icon className="size-4" aria-hidden />
                </span>
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-3 space-y-3">
        <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
          <NavLink
            to={routes.newCase}
            className="group flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-brand-700 px-3 py-3 text-sm font-semibold text-brand-50 shadow-lg shadow-brand-700/20 transition-colors hover:bg-brand-800"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-white/10">
              <Plus className="size-4" aria-hidden />
            </span>
            <span className="flex-1 text-left leading-tight">
              วิเคราะห์เคสใหม่
              <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-brand-100/70">
                <Sparkles className="size-3" aria-hidden />
                AI ช่วยวางแผนให้
              </span>
            </span>
          </NavLink>
        </motion.div>

        <Link
          to={routes.profile}
          className="flex items-center gap-2.5 rounded-2xl bg-surface/80 px-2.5 py-2.5 transition-colors hover:bg-brand-50"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-brand-50">
            {initials(profile.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{profile.name}</p>
            <p className="truncate text-[11px] text-muted">ดูโปรไฟล์</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
