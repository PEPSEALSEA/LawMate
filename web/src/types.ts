export type CaseStatus = 'in_progress' | 'done' | 'pending'
export type StepStatus = 'done' | 'current' | 'pending'

export interface ActionStep {
  id: string
  title: string
  subtitle: string
  detail: string
  status: StepStatus
  urgent?: boolean
}

export interface EvidenceFile {
  id: string
  name: string
  sizeLabel: string
  uploadedAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export interface LegalCase {
  id: string
  referenceCode: string
  category: string
  title: string
  subtitle?: string
  status: CaseStatus
  summary: string
  dueDate: string
  createdAt: string
  steps: ActionStep[]
  insights: string[]
  evidence: EvidenceFile[]
  chat: ChatMessage[]
}
