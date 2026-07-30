import { useState } from 'react'
import { motion } from 'framer-motion'
import { ActionCenter } from '@/components/ActionCenter'
import { ActionPlan } from '@/components/ActionPlan'
import { AIInsights } from '@/components/AIInsights'
import { CaseHero } from '@/components/CaseHero'
import { ConsultAIPanel } from '@/components/ConsultAIPanel'
import { DraftDocumentModal } from '@/components/DraftDocumentModal'
import { UploadEvidenceModal } from '@/components/UploadEvidenceModal'
import type { LegalCase } from '@/types'

type ActiveModal = 'draft' | 'upload' | 'consult' | null

export function CaseView({ legalCase }: { legalCase: LegalCase }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <CaseHero legalCase={legalCase} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-ink">สรุปสถานการณ์</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{legalCase.summary}</p>
          </motion.div>

          <ActionPlan legalCase={legalCase} />

          <div className="lg:hidden">
            <AIInsights insights={legalCase.insights} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-6"
        >
          <ActionCenter
            activeAction={activeModal}
            onDraftDocument={() => setActiveModal('draft')}
            onUploadEvidence={() => setActiveModal('upload')}
            onConsultAI={() => setActiveModal('consult')}
          />
          <div className="hidden lg:block">
            <AIInsights insights={legalCase.insights} />
          </div>
        </motion.div>
      </div>

      <DraftDocumentModal
        legalCase={legalCase}
        open={activeModal === 'draft'}
        onClose={() => setActiveModal(null)}
      />
      <UploadEvidenceModal
        legalCase={legalCase}
        open={activeModal === 'upload'}
        onClose={() => setActiveModal(null)}
      />
      <ConsultAIPanel
        legalCase={legalCase}
        open={activeModal === 'consult'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  )
}
