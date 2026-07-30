import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { seedCases } from '@/data/seedCases'
import type { ActionStep, ChatMessage, EvidenceFile, LegalCase } from '@/types'

const STORAGE_KEY = 'lawmate.cases.v1'

function loadCases(): LegalCase[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedCases()
    const parsed = JSON.parse(raw) as LegalCase[]
    if (!Array.isArray(parsed) || parsed.length === 0) return seedCases()
    return parsed
  } catch {
    return seedCases()
  }
}

interface CasesContextValue {
  cases: LegalCase[]
  getCase: (id: string) => LegalCase | undefined
  addCase: (newCase: LegalCase) => void
  advanceStep: (caseId: string, stepId: string) => void
  addEvidence: (caseId: string, files: EvidenceFile[]) => void
  removeEvidence: (caseId: string, evidenceId: string) => void
  addChatMessage: (caseId: string, message: ChatMessage) => void
}

const CasesContext = createContext<CasesContextValue | null>(null)

export function CasesProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<LegalCase[]>(() => loadCases())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases))
  }, [cases])

  const getCase = useCallback((id: string) => cases.find((c) => c.id === id), [cases])

  const addCase = useCallback((newCase: LegalCase) => {
    setCases((prev) => [newCase, ...prev])
  }, [])

  const advanceStep = useCallback((caseId: string, stepId: string) => {
    setCases((prev) =>
      prev.map((legalCase) => {
        if (legalCase.id !== caseId) return legalCase

        const stepIndex = legalCase.steps.findIndex((s) => s.id === stepId)
        if (stepIndex === -1) return legalCase

        const steps: ActionStep[] = legalCase.steps.map((step, index) => {
          if (index === stepIndex) return { ...step, status: 'done', urgent: false }
          if (index === stepIndex + 1) return { ...step, status: 'current' }
          return step
        })

        const allDone = steps.every((step) => step.status === 'done')

        return {
          ...legalCase,
          steps,
          status: allDone ? 'done' : legalCase.status,
        }
      }),
    )
  }, [])

  const addEvidence = useCallback((caseId: string, files: EvidenceFile[]) => {
    setCases((prev) =>
      prev.map((legalCase) =>
        legalCase.id === caseId
          ? { ...legalCase, evidence: [...files, ...legalCase.evidence] }
          : legalCase,
      ),
    )
  }, [])

  const removeEvidence = useCallback((caseId: string, evidenceId: string) => {
    setCases((prev) =>
      prev.map((legalCase) =>
        legalCase.id === caseId
          ? { ...legalCase, evidence: legalCase.evidence.filter((e) => e.id !== evidenceId) }
          : legalCase,
      ),
    )
  }, [])

  const addChatMessage = useCallback((caseId: string, message: ChatMessage) => {
    setCases((prev) =>
      prev.map((legalCase) =>
        legalCase.id === caseId ? { ...legalCase, chat: [...legalCase.chat, message] } : legalCase,
      ),
    )
  }, [])

  const value = useMemo<CasesContextValue>(
    () => ({ cases, getCase, addCase, advanceStep, addEvidence, removeEvidence, addChatMessage }),
    [cases, getCase, addCase, advanceStep, addEvidence, removeEvidence, addChatMessage],
  )

  return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>
}

export function useCases() {
  const ctx = useContext(CasesContext)
  if (!ctx) throw new Error('useCases must be used within CasesProvider')
  return ctx
}
