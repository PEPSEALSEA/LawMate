import { FolderKanban, LogOut } from 'lucide-react'
import { Link } from 'react-router'
import { useCases } from '@/state/CasesContext'
import { useProfile } from '@/state/ProfileContext'

export function ProfilePage() {
  const { profile } = useProfile()
  const { cases } = useCases()
  const activeCount = cases.filter((c) => c.status === 'in_progress').length

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="text-2xl font-bold text-ink">โปรไฟล์</h1>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand-700 text-xl font-bold text-white">
          {profile.name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </span>
        <div>
          <p className="text-lg font-bold text-ink">{profile.name}</p>
          <p className="text-sm text-muted">{profile.email}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-brand-700">{cases.length}</p>
          <p className="mt-1 text-xs text-muted">เคสทั้งหมด</p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm">
          <p className="text-2xl font-bold text-brand-700">{activeCount}</p>
          <p className="mt-1 text-xs text-muted">กำลังดำเนินการ</p>
        </div>
      </div>

      <Link
        to="/cases"
        className="mt-4 flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 text-sm font-medium text-ink shadow-sm hover:bg-surface"
      >
        <span className="flex items-center gap-2.5">
          <FolderKanban className="size-4 text-brand-700" aria-hidden />
          ดูเคสทั้งหมดของฉัน
        </span>
        <span className="text-muted">→</span>
      </Link>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-urgent/20 bg-urgent/5 py-3.5 text-sm font-semibold text-urgent hover:bg-urgent/10"
      >
        <LogOut className="size-4" aria-hidden />
        ออกจากระบบ
      </button>
    </div>
  )
}
