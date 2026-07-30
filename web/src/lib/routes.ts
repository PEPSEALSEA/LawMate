export const routes = {
  welcome: '/',
  app: '/app',
  cases: '/app/cases',
  newCase: '/app/cases/new',
  caseDetail: (caseId: string) => `/app/cases/${caseId}`,
  knowledge: '/app/knowledge',
  settings: '/app/settings',
  alerts: '/app/alerts',
  profile: '/app/profile',
}
