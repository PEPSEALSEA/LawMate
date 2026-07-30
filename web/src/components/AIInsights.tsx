import { Lightbulb } from 'lucide-react'

export function AIInsights({ insights }: { insights: string[] }) {
  if (insights.length === 0) return null

  return (
    <div className="rounded-2xl border border-insight bg-insight/40 p-6">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand-700 text-white">
          <Lightbulb className="size-4" aria-hidden />
        </span>
        <h2 className="text-base font-bold text-ink">AI Insights</h2>
      </div>

      <ul className="mt-4 space-y-3">
        {insights.map((insight) => (
          <li key={insight} className="flex gap-2 text-sm leading-relaxed text-ink/80">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-700/60" aria-hidden />
            {insight}
          </li>
        ))}
      </ul>
    </div>
  )
}
