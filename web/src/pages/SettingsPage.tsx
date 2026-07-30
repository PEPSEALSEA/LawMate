import { useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { useProfile } from '@/state/ProfileContext'

export function SettingsPage() {
  const { profile, updateProfile } = useProfile()
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="text-2xl font-bold text-ink">ตั้งค่า</h1>
      <p className="mt-1 text-sm text-muted">จัดการข้อมูลส่วนตัวและการแจ้งเตือนของคุณ</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-muted">ชื่อ-นามสกุล</span>
            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted">เบอร์โทรศัพท์</span>
            <input
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold text-muted">อีเมล</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="mt-1.5 w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500"
          />
        </label>

        <div className="space-y-3 border-t border-black/5 pt-5">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">การแจ้งเตือน</p>
          <label className="flex items-center justify-between gap-4 text-sm text-ink">
            แจ้งเตือนทางอีเมลเมื่อใกล้ครบกำหนด
            <input
              type="checkbox"
              checked={form.notifyEmail}
              onChange={(e) => setForm((prev) => ({ ...prev, notifyEmail: e.target.checked }))}
              className="size-4 accent-brand-700"
            />
          </label>
          <label className="flex items-center justify-between gap-4 text-sm text-ink">
            แจ้งเตือนทาง SMS สำหรับขั้นตอนด่วน
            <input
              type="checkbox"
              checked={form.notifySms}
              onChange={(e) => setForm((prev) => ({ ...prev, notifySms: e.target.checked }))}
              className="size-4 accent-brand-700"
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-700/20 hover:bg-brand-800"
        >
          {saved ? <Check className="size-4" aria-hidden /> : null}
          {saved ? 'บันทึกแล้ว' : 'บันทึกการเปลี่ยนแปลง'}
        </button>
      </form>
    </div>
  )
}
