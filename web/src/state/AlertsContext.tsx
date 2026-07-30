import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useCases } from '@/state/CasesContext'
import { getDaysLeft } from '@/lib/case-utils'

const READ_STORAGE_KEY = 'lawmate.alerts.read.v1'

export interface AppAlert {
  id: string
  caseId: string
  caseTitle: string
  level: 'urgent' | 'info'
  title: string
  message: string
}

interface AlertsContextValue {
  alerts: AppAlert[]
  unreadCount: number
  markRead: (id: string) => void
  markAllRead: () => void
}

const AlertsContext = createContext<AlertsContextValue | null>(null)

function loadReadIds(): string[] {
  try {
    const raw = localStorage.getItem(READ_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function AlertsProvider({ children }: { children: ReactNode }) {
  const { cases } = useCases()
  const [readIds, setReadIds] = useState<string[]>(() => loadReadIds())

  useEffect(() => {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(readIds))
  }, [readIds])

  const alerts = useMemo<AppAlert[]>(() => {
    const list: AppAlert[] = []

    for (const legalCase of cases) {
      if (legalCase.status === 'done') continue

      const daysLeft = getDaysLeft(legalCase.dueDate)
      if (daysLeft <= 7) {
        list.push({
          id: `${legalCase.id}-deadline`,
          caseId: legalCase.id,
          caseTitle: legalCase.title,
          level: 'urgent',
          title: 'ใกล้ครบกำหนดเวลา',
          message:
            daysLeft <= 0
              ? `เคส "${legalCase.title}" เลยกำหนดเวลาแล้ว โปรดดำเนินการโดยด่วน`
              : `เคส "${legalCase.title}" เหลือเวลาอีก ${daysLeft} วันก่อนถึงกำหนด`,
        })
      }

      const urgentStep = legalCase.steps.find((step) => step.status === 'current' && step.urgent)
      if (urgentStep) {
        list.push({
          id: `${legalCase.id}-${urgentStep.id}`,
          caseId: legalCase.id,
          caseTitle: legalCase.title,
          level: 'urgent',
          title: 'มีขั้นตอนด่วนที่ต้องดำเนินการ',
          message: `${urgentStep.title} — ${urgentStep.detail}`,
        })
      }
    }

    return list
  }, [cases])

  const unreadCount = alerts.filter((alert) => !readIds.includes(alert.id)).length

  const markRead = useCallback(
    (id: string) => setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [],
  )
  const markAllRead = useCallback(() => setReadIds(alerts.map((alert) => alert.id)), [alerts])

  const value = useMemo<AlertsContextValue>(
    () => ({ alerts, unreadCount, markRead, markAllRead }),
    [alerts, unreadCount, markRead, markAllRead],
  )

  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
}

export function useAlerts() {
  const ctx = useContext(AlertsContext)
  if (!ctx) throw new Error('useAlerts must be used within AlertsProvider')
  return ctx
}
