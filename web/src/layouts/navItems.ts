import { Bell, FolderKanban, LayoutDashboard, LibraryBig, Settings, User } from 'lucide-react'

export const sidebarNavItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/cases', label: 'Cases', icon: FolderKanban },
  { to: '/knowledge', label: 'Knowledge Center', icon: LibraryBig },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export const bottomNavItems = [
  { to: '/', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/cases', label: 'Cases', icon: FolderKanban },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/profile', label: 'Profile', icon: User },
]
