import { CaseView } from '@/components/CaseView'
import { EmptyState } from '@/components/EmptyState'
import { useCases } from '@/state/CasesContext'

export function DashboardPage() {
  const { cases } = useCases()

  if (cases.length === 0) {
    return (
      <EmptyState
        title="ยังไม่มีเคสที่วิเคราะห์"
        body="เริ่มต้นด้วยการบอกสถานการณ์ของคุณ แล้วให้ LawMate วิเคราะห์สิทธิและสร้างแผนดำเนินการให้"
      />
    )
  }

  const activeCase = cases.find((c) => c.status === 'in_progress') ?? cases[0]

  return <CaseView legalCase={activeCase} />
}
