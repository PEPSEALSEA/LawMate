import type { LegalCase } from '@/types'

export function getProgress(legalCase: LegalCase): number {
  if (legalCase.steps.length === 0) return 0
  const done = legalCase.steps.filter((step) => step.status === 'done').length
  return Math.round((done / legalCase.steps.length) * 100)
}

export function getDaysLeft(dueDate: string): number {
  const diff = new Date(dueDate).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function formatThaiDate(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH-u-ca-buddhist', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function statusLabel(status: LegalCase['status']): string {
  switch (status) {
    case 'done':
      return 'เสร็จสิ้น'
    case 'pending':
      return 'รอดำเนินการ'
    default:
      return 'กำลังดำเนินการ'
  }
}
