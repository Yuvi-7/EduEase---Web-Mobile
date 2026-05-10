import { useState } from 'react'
import { Login } from '@/pages/auth/Login'
import { useAuthStore } from '@/store/auth'
import { useNavStore } from '@/store/nav'
import { SchoolAdminSidebar, SuperAdminSidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

// School admin pages
import { Dashboard }  from '@/pages/school-admin/Dashboard'
import { Students }   from '@/pages/school-admin/Students'
import { Teachers }   from '@/pages/school-admin/Teachers'
import { Parents }    from '@/pages/school-admin/Parents'
import { Classes }    from '@/pages/school-admin/Classes'
import { Attendance } from '@/pages/school-admin/Attendance'
import { Timetable }  from '@/pages/school-admin/Timetable'
import { Fees }       from '@/pages/school-admin/Fees'
import { Messages }   from '@/pages/school-admin/Messages'
import { Reports }    from '@/pages/school-admin/Reports'
import { Settings }   from '@/pages/school-admin/Settings'

// Super admin pages
import { NetworkOverview } from '@/pages/super-admin/NetworkOverview'

// ── Toast ────────────────────────────────────────────────────────────
function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useState(() => { setTimeout(onDone, 2500) })
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--ink-1)] text-white px-4 py-3 rounded-[10px] text-[13px] flex items-center gap-2.5 shadow-[var(--shadow-2)] z-[60] whitespace-nowrap">
      <span className="w-4 h-4 rounded-full bg-[var(--mint-500)] flex items-center justify-center text-[10px]">✓</span>
      {msg}
    </div>
  )
}

// ── School Admin shell ───────────────────────────────────────────────
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

// ── Super Admin shell ────────────────────────────────────────────────
function SuperAdminApp() {
  const logout = useAuthStore(s => s.logout)
  const { superPage, setSuperPage } = useNavStore()
  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="flex h-screen overflow-hidden">
      <SuperAdminSidebar active={superPage} onNav={p => setSuperPage(p as typeof superPage)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          searchPlaceholder="Search across 11,294 students, 681 teachers…"
          onNew={() => setToast('Add school modal opened')}
          termLabel="May 2026"
          onLogout={logout}
        />
        <main className="flex-1 overflow-y-auto p-7 bg-[var(--surface-page)]">
          <NetworkOverview />
        </main>
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

// ── Root ─────────────────────────────────────────────────────────────
export default function App() {
  const role = useAuthStore(s => s.role)

  if (!role)                return <Login />
  if (role === 'super-admin') return <SuperAdminApp />
  return <SchoolAdminApp />
}
