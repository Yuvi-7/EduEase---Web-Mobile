import {
  LayoutDashboard, GraduationCap, Users, User, BookOpen,
  ClipboardCheck, Calendar, CreditCard, MessageSquare,
  BarChart3, Settings, ChevronUp, Building2, KeyRound,
  Headphones, Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'

export type SchoolAdminPage =
  | 'dashboard' | 'students' | 'teachers' | 'parents'
  | 'classes' | 'attendance' | 'timetable' | 'fees'
  | 'messages' | 'reports' | 'settings'

export type SuperAdminPage =
  | 'schools' | 'people' | 'reports' | 'billing'
  | 'licensing' | 'support' | 'settings' | 'security'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  count?: number
}

interface NavGroup {
  group: string | null
  items: NavItem[]
}

// ── School Admin nav ─────────────────────────────────────────────────
const SCHOOL_NAV: NavGroup[] = [
  {
    group: null,
    items: [{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} strokeWidth={1.75} /> }],
  },
  {
    group: 'People',
    items: [
      { id: 'students', label: 'Students',   icon: <GraduationCap size={18} strokeWidth={1.75} /> },
      { id: 'teachers', label: 'Teachers',   icon: <Users size={18} strokeWidth={1.75} /> },
      { id: 'parents',  label: 'Parents',    icon: <User size={18} strokeWidth={1.75} /> },
    ],
  },
  {
    group: 'Operations',
    items: [
      { id: 'classes',    label: 'Classes',    icon: <BookOpen size={18} strokeWidth={1.75} /> },
      { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck size={18} strokeWidth={1.75} /> },
      { id: 'timetable',  label: 'Timetable',  icon: <Calendar size={18} strokeWidth={1.75} /> },
      { id: 'fees',       label: 'Fees',       icon: <CreditCard size={18} strokeWidth={1.75} />, count: 3 },
      { id: 'messages',   label: 'Messages',   icon: <MessageSquare size={18} strokeWidth={1.75} /> },
    ],
  },
  {
    group: 'Insights',
    items: [
      { id: 'reports',  label: 'Reports',  icon: <BarChart3 size={18} strokeWidth={1.75} /> },
      { id: 'settings', label: 'Settings', icon: <Settings size={18} strokeWidth={1.75} /> },
    ],
  },
]

// ── Super Admin nav ──────────────────────────────────────────────────
const SUPER_NAV: NavGroup[] = [
  {
    group: 'Network',
    items: [
      { id: 'schools',  label: 'All Schools',       icon: <Building2 size={18} strokeWidth={1.75} />, count: 8 },
      { id: 'people',   label: 'People',            icon: <Users size={18} strokeWidth={1.75} /> },
      { id: 'reports',  label: 'District Reports',  icon: <BarChart3 size={18} strokeWidth={1.75} /> },
    ],
  },
  {
    group: 'Operations',
    items: [
      { id: 'billing',   label: 'Billing',          icon: <CreditCard size={18} strokeWidth={1.75} /> },
      { id: 'licensing', label: 'Licensing',        icon: <KeyRound size={18} strokeWidth={1.75} /> },
      { id: 'support',   label: 'Support Tickets',  icon: <Headphones size={18} strokeWidth={1.75} />, count: 5 },
    ],
  },
  {
    group: 'Admin',
    items: [
      { id: 'settings', label: 'Settings',        icon: <Settings size={18} strokeWidth={1.75} /> },
      { id: 'security', label: 'Security & Audit', icon: <Shield size={18} strokeWidth={1.75} /> },
    ],
  },
]

// ── Generic Sidebar ──────────────────────────────────────────────────
interface SidebarProps {
  nav: NavGroup[]
  active: string
  onNav: (id: string) => void
  schoolName: string
  userName: string
  userRole: string
  userInitials: string
  accentColor?: string
  roleTagColor?: string
}

function SidebarBase({
  nav, active, onNav, schoolName, userName, userRole, userInitials, accentColor = 'var(--scholar-600)', roleTagColor,
}: SidebarProps) {
  return (
    <aside className="w-[248px] flex flex-col bg-white border-r border-[var(--line)] py-4 px-3 overflow-y-auto flex-shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2 pb-4">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: accentColor }}
        >
          E
        </div>
        <div>
          <div className="font-semibold text-[16px] tracking-[-0.01em] leading-none">EduEase</div>
          <div
            className="text-[11px] mt-0.5 font-medium"
            style={{ color: roleTagColor ?? 'var(--ink-3)' }}
          >
            {schoolName}
          </div>
        </div>
      </div>

      {/* Nav groups */}
      {nav.map((section, i) => (
        <div key={i}>
          {section.group && (
            <div className="text-[10px] uppercase tracking-[0.06em] text-[var(--ink-3)] font-semibold px-2.5 pt-3.5 pb-1.5">
              {section.group}
            </div>
          )}
          {section.items.map(item => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={cn(
                'w-full flex items-center gap-2.5 h-9 px-2.5 rounded-lg text-[13px] font-medium cursor-pointer transition-all',
                active === item.id
                  ? 'bg-[var(--scholar-50)] text-[var(--scholar-700)] font-semibold'
                  : 'text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] hover:text-[var(--ink-1)]'
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
              {item.count != null && (
                <span className={cn(
                  'ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                  active === item.id
                    ? 'bg-[var(--scholar-100)] text-[var(--scholar-700)]'
                    : 'bg-[var(--coral-50)] text-[var(--coral-700)]'
                )}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}

      {/* Footer — live from auth store */}
      <SidebarFooter accentColor={accentColor} fallbackName={userName} fallbackRole={userRole} fallbackInitials={userInitials} />
    </aside>
  )
}

function SidebarFooter({
  accentColor, fallbackName, fallbackRole, fallbackInitials,
}: { accentColor: string; fallbackName: string; fallbackRole: string; fallbackInitials: string }) {
  const user = useAuthStore(s => s.user)
  const name     = user?.name     ?? fallbackName
  const role     = user?.roleLabel ?? fallbackRole
  const initials = user?.initials  ?? fallbackInitials
  const color    = user?.accentColor ?? accentColor

  return (
    <div className="mt-auto pt-3 border-t border-[var(--line)] flex items-center gap-2.5 px-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
        style={{ background: color }}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-[var(--ink-1)] truncate">{name}</div>
        <div className="text-[11px] text-[var(--ink-3)] truncate">{role}</div>
      </div>
      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)]">
        <ChevronUp size={14} />
      </button>
    </div>
  )
}

// ── Exported specializations ─────────────────────────────────────────
export function SchoolAdminSidebar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <SidebarBase
      nav={SCHOOL_NAV}
      active={active}
      onNav={onNav}
      schoolName="Lakeside Academy"
      userName="Maya Singh"
      userRole="Principal"
      userInitials="MS"
    />
  )
}

export function SuperAdminSidebar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <SidebarBase
      nav={SUPER_NAV}
      active={active}
      onNav={onNav}
      schoolName="Super Admin · District"
      userName="Neha Khan"
      userRole="District Lead · 8 schools"
      userInitials="NK"
      accentColor="var(--coral-600)"
      roleTagColor="var(--coral-700)"
    />
  )
}
