import { Scale } from 'lucide-react'
import { navLinks } from '@/data/content'

export function Footer() {
  return (
    <footer className="bg-brand-900 py-12 text-brand-100/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <a href="#top" className="flex items-center gap-2 font-bold text-white">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
            <Scale className="size-4" aria-hidden />
          </span>
          LawMate AI
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs">© {new Date().getFullYear()} LawMate AI — Legal Intelligence</p>
      </div>
    </footer>
  )
}
