import { Bell, FolderKanban, LayoutDashboard, LibraryBig, Settings, User } from 'lucide-react'
import { routes } from '@/lib/routes'

export const sidebarNavItems = [
  { to: routes.app, label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: routes.cases, label: 'Cases', icon: FolderKanban },
  { to: routes.knowledge, label: 'Knowledge Center', icon: LibraryBig },
  { to: routes.settings, label: 'Settings', icon: Settings },
]

export const bottomNavItems = [
  { to: routes.app, label: 'Home', icon: LayoutDashboard, end: true },
  { to: routes.cases, label: 'Cases', icon: FolderKanban },
  { to: routes.alerts, label: 'Alerts', icon: Bell },
  { to: routes.profile, label: 'Profile', icon: User },
]
