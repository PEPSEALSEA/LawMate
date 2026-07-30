import { motion } from 'framer-motion'
import { knowledgeArticles } from '@/data/knowledgeArticles'

export function KnowledgeCenterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="text-2xl font-bold text-ink">คลังความรู้กฎหมาย</h1>
      <p className="mt-1 text-sm text-muted">ความรู้กฎหมายเบื้องต้นที่คนไทยควรรู้ อธิบายง่าย เข้าใจได้ทันที</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {knowledgeArticles.map((article, index) => (
          <motion.article
            key={article.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-ink/8 bg-panel p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-700/10 text-brand-700">
              <article.icon className="size-5" aria-hidden />
            </span>
            <p className="mt-3 text-xs font-semibold tracking-wide text-brand-700 uppercase">
              {article.category}
            </p>
            <h2 className="mt-1 text-base font-bold text-ink">{article.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{article.body}</p>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
