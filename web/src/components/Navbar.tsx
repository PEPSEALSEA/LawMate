import { useState } from 'react'
import { Menu, Scale, X } from 'lucide-react'
import { navLinks } from '@/data/content'
import { cn } from '@/lib/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-bold text-ink">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md shadow-brand-700/20">
            <Scale className="size-5" aria-hidden />
          </span>
          <span className="text-lg tracking-tight">LawMate AI</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#cta"
            className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-700/20 transition-colors hover:bg-brand-800"
          >
            ทดลองใช้งานฟรี
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-label="เปิดเมนู"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          'grid overflow-hidden border-t border-black/5 bg-white transition-[grid-template-rows] duration-200 md:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-brand-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-brand-700 px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              ทดลองใช้งานฟรี
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
