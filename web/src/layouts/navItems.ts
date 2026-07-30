import { Bell, FolderKanban, LayoutDashboard, LibraryBig, Settings, User } from 'lucide-react'
import { routes } from '@/lib/routes'

export const sidebarNavItems = [
  { to: routes.app, label: 'หน้าหลัก', icon: LayoutDashboard, end: true },
  { to: routes.cases, label: 'เคสของฉัน', icon: FolderKanban },
  { to: routes.knowledge, label: 'คลังความรู้', icon: LibraryBig },
  { to: routes.settings, label: 'ตั้งค่า', icon: Settings },
]

export const bottomNavItems = [
  { to: routes.app, label: 'หน้าหลัก', icon: LayoutDashboard, end: true },
  { to: routes.cases, label: 'เคส', icon: FolderKanban },
  { to: routes.alerts, label: 'แจ้งเตือน', icon: Bell },
  { to: routes.profile, label: 'โปรไฟล์', icon: User },
]
