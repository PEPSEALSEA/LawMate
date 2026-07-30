import { Navigate, Route, Routes } from 'react-router'
import { AppShell } from '@/layouts/AppShell'
import { AlertsPage } from '@/pages/AlertsPage'
import { CaseDetailPage } from '@/pages/CaseDetailPage'
import { CasesListPage } from '@/pages/CasesListPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { KnowledgeCenterPage } from '@/pages/KnowledgeCenterPage'
import { NewAnalysisPage } from '@/pages/NewAnalysisPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { AlertsProvider } from '@/state/AlertsContext'
import { CasesProvider } from '@/state/CasesContext'
import { ProfileProvider } from '@/state/ProfileContext'

export default function App() {
  return (
    <CasesProvider>
      <AlertsProvider>
        <ProfileProvider>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/cases" element={<CasesListPage />} />
              <Route path="/cases/new" element={<NewAnalysisPage />} />
              <Route path="/cases/:caseId" element={<CaseDetailPage />} />
              <Route path="/knowledge" element={<KnowledgeCenterPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ProfileProvider>
      </AlertsProvider>
    </CasesProvider>
  )
}
