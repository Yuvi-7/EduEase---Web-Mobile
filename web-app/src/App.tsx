import { useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { useNavStore } from '@/store/nav'
import { SchoolAdminSidebar, SuperAdminSidebar } from '@/shared/components/layout/Sidebar'
import { TopBar } from '@/shared/components/layout/TopBar'

import { Login }      from '@/features/auth/pages/Login'
import { Dashboard }  from '@/features/dashboard/pages/Dashboard'
import { Students }   from '@/features/students/pages/Students'
import { Teachers }   from '@/features/teachers/pages/Teachers'
import { Parents }    from '@/features/parents/pages/Parents'
import { Classes }    from '@/features/classes/pages/Classes'
import { Attendance } from '@/features/attendance/pages/Attendance'
import { Timetable }  from '@/features/timetable/pages/Timetable'
import { Fees }       from '@/features/fees/pages/Fees'
import { Messages }   from '@/features/messages/pages/Messages'
import { Reports }    from '@/features/reports/pages/Reports'
import { Settings }   from '@/features/settings/pages/Settings'

import { NetworkOverview } from '@/features/network/pages/NetworkOverview'
import { OnboardWizard }   from '@/features/onboarding/pages/OnboardWizard'

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useState(() => { setTimeout(onDone, 2500) })
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--ink-1)] text-white px-4 py-3 rounded-[10px] text-[13px] flex items-center gap-2.5 shadow-[var(--shadow-2)] z-[60] whitespace-nowrap">
      <span className="w-4 h-4 rounded-full bg-[var(--mint-500)] flex items-center justify-center text-[10px]">✓</span>
      {msg}
    </div>
  )
}

function SchoolAdminApp() {
  const logout = useAuthStore(s => s.logout)
  const { schoolPage, setSchoolPage } = useNavStore()
  const [toast, setToast] = useState<string | null>(null)

  const PageContent = () => {
    switch (schoolPage) {
      case 'dashboard':  return <Dashboard />
      case 'students':   return <Students />
      case 'teachers':   return <Teachers />
      case 'parents':    return <Parents />
      case 'classes':    return <Classes />
      case 'attendance': return <Attendance />
      case 'timetable':  return <Timetable />
      case 'fees':       return <Fees />
      case 'messages':   return <Messages />
      case 'reports':    return <Reports />
      case 'settings':   return <Settings />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SchoolAdminSidebar active={schoolPage} onNav={p => setSchoolPage(p as typeof schoolPage)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          onNew={() => setToast('New action menu opened')}
          onLogout={logout}
        />
        <main className="flex-1 overflow-y-auto p-7 bg-[var(--surface-page)]">
          <PageContent />
        </main>
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

function SuperAdminApp() {
  const logout = useAuthStore(s => s.logout)
  const { superPage, setSuperPage } = useNavStore()
  const [onboarding, setOnboarding] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <SuperAdminSidebar active={superPage} onNav={p => setSuperPage(p as typeof superPage)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        {!onboarding && (
          <TopBar
            searchPlaceholder="Search across 11,294 students, 681 teachers…"
            onNew={() => setOnboarding(true)}
            termLabel="May 2026"
            onLogout={logout}
          />
        )}
        {onboarding ? (
          <OnboardWizard
            onClose={() => setOnboarding(false)}
            onLaunch={() => setOnboarding(false)}
          />
        ) : (
          <main className="flex-1 overflow-y-auto p-7 bg-[var(--surface-page)]">
            <NetworkOverview />
          </main>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const role = useAuthStore(s => s.role)

  if (!role)                return <Login />
  if (role === 'super-admin') return <SuperAdminApp />
  return <SchoolAdminApp />
}
