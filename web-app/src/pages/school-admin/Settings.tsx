import { School, Calendar, Bell, Shield, Edit3 } from 'lucide-react'

const groups = [
  {
    title: 'School profile', icon: School,
    rows: [['Name', 'Lakeside Academy'], ['Code', 'LSA-PUN-04'], ['Region', 'Pune, MH · India'], ['Term', 'Term 2 · 2025–26']],
  },
  {
    title: 'Academic year', icon: Calendar,
    rows: [['Start', '1 Apr 2025'], ['End', '31 Mar 2026'], ['Working days', 'Mon–Sat'], ['Periods/day', '8 + lunch']],
  },
  {
    title: 'Notifications', icon: Bell,
    rows: [['Daily attendance digest', 'On — 18:00'], ['Fee reminders', '3 days before'], ['PTM invites', 'SMS + email'], ['Weekly principal report', 'Mondays 7am']],
  },
  {
    title: 'Permissions', icon: Shield,
    rows: [['Super admins', '2'], ['School admins', '5'], ['Teachers can edit', 'Their classes only'], ['Parents can view', 'Their children only']],
  },
]

export function Settings() {
  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Settings</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">Lakeside Academy · last edited by Maya, 9 May</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {groups.map(g => {
          const Icon = g.icon
          return (
            <div key={g.title} className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
                <div className="flex items-center gap-2.5">
                  <Icon size={18} className="text-[var(--scholar-600)]" />
                  <h3 className="text-[16px] font-semibold">{g.title}</h3>
                </div>
                <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
                  <Edit3 size={13} /> Edit
                </button>
              </div>
              {g.rows.map(([k, v], i) => (
                <div
                  key={k}
                  className="flex justify-between items-center px-5 py-3.5 text-[13px]"
                  style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}
                >
                  <span className="text-[var(--ink-2)]">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}
