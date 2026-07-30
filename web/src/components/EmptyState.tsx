import { motion } from 'framer-motion'
import { Plus, Scale } from 'lucide-react'
import { Link } from 'react-router'

export function EmptyState({
  title,
  body,
  ctaLabel = 'เริ่มวิเคราะห์เคสใหม่',
  ctaTo = '/cases/new',
}: {
  title: string
  body: string
  ctaLabel?: string
  ctaTo?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center"
    >
      <motion.span
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
        className="flex size-16 items-center justify-center rounded-2xl bg-brand-700/10 text-brand-700"
      >
        <Scale className="size-8" aria-hidden />
      </motion.span>
      <h1 className="text-xl font-bold text-ink">{title}</h1>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          to={ctaTo}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-700/20 hover:bg-brand-800"
        >
          <Plus className="size-4" aria-hidden />
          {ctaLabel}
        </Link>
      </motion.div>
    </motion.div>
  )
}
