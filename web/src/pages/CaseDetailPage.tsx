import { Navigate, useParams } from 'react-router'
import { CaseView } from '@/components/CaseView'
import { useCases } from '@/state/CasesContext'

export function CaseDetailPage() {
  const { caseId } = useParams<{ caseId: string }>()
  const { getCase } = useCases()

  const legalCase = caseId ? getCase(caseId) : undefined

  if (!legalCase) {
    return <Navigate to="/cases" replace />
  }

  return <CaseView legalCase={legalCase} />
}
