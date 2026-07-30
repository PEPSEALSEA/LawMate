import { Scale } from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router'
import { cn } from '@/lib/cn'

function HomePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <div
        className={cn(
          'flex size-14 items-center justify-center rounded-2xl',
          'bg-brand-700 text-white shadow-lg shadow-brand-700/20',
        )}
      >
        <Scale className="size-7" aria-hidden />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-brand-700 sm:text-4xl">
          LawMate AI
        </h1>
        <p className="max-w-md text-base text-muted sm:text-lg">
          ตัวช่วยกฎหมายที่บอกว่าต้องทำอะไร ภายในกี่วัน และไปที่ไหน
        </p>
      </div>
      <p className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
        Demo scaffold พร้อมแล้ว
      </p>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
