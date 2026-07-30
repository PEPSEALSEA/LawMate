import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

export function AIInsights({ insights }: { insights: string[] }) {
  if (insights.length === 0) return null

  return (
    <div className="rounded-2xl border border-insight bg-insight/40 p-6">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand-700 text-white">
          <Lightbulb className="size-4" aria-hidden />
        </span>
        <h2 className="text-base font-bold text-ink">สิ่งที่ควรรู้</h2>
      </div>

      <ul className="mt-4 space-y-3">
        {insights.map((insight, index) => (
          <motion.li
            key={insight}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.35 }}
            className="flex gap-2 text-sm leading-relaxed text-ink/80"
          >
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-700/60" aria-hidden />
            {insight}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
