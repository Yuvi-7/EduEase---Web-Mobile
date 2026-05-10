import { X, MessageSquare, Check, FileText, CreditCard, Trophy } from 'lucide-react'
import { Avatar } from '@/components/shared/Avatar'
import { Badge } from '@/components/shared/Badge'
import type { Student } from '@/types'
import { cn } from '@/lib/utils'
import { avatarColor, initials } from '@/lib/utils'

interface StudentDrawerProps {
  student: Student | null
  open: boolean
  onClose: () => void
}

const activity = [
  { icon: Check,      label: 'Marked present',             when: 'Today · 8:42 AM' },
  { icon: FileText,   label: 'Submitted "Algebra Quiz 4"', when: 'Yesterday · 2:10 PM' },
  { icon: CreditCard, label: 'Term 2 fees paid',           when: 'May 4, 2026' },
  { icon: Trophy,     label: 'Earned "5-day streak" badge',when: 'May 2, 2026' },
]

export function StudentDrawer({ student, open, onClose }: StudentDrawerProps) {
  return (
    <>
      {/* Scrim */}
      <div
        className={cn(
          'fixed inset-0 z-50 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'var(--surface-overlay)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[51] w-[480px] flex flex-col',
          'bg-[var(--surface-page)] border-l border-[var(--line)]',
          'transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {!student ? null : (
          <>
            {/* Head */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)]">
              <div className="text-[11px] uppercase tracking-[0.06em] text-[var(--ink-3)] font-semibold">Student profile</div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Name + ID */}
              <div className="flex items-center gap-3.5 mb-5">
                <Avatar name={student.name} size="lg" />
                <div>
                  <div className="font-semibold text-[24px] tracking-[-0.02em]">{student.name}</div>
                  <div className="flex items-center gap-2 text-[13px] text-[var(--ink-2)] mt-0.5">
                    <span className="font-mono">{student.id}</span>
                    <span className="text-[var(--ink-3)]">·</span>
                    <span>Grade {student.grade}</span>
                  </div>
                </div>
              </div>

              {/* KPI tiles */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { label: 'Attendance', value: `${student.attendance}%` },
                  { label: 'GPA',        value: '3.6' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white border border-[var(--line)] rounded-xl p-3.5">
                    <div className="text-[11px] text-[var(--ink-3)] font-semibold uppercase tracking-[0.06em]">{label}</div>
                    <div className="font-semibold text-[24px] tracking-[-0.02em] mt-1">{value}</div>
                  </div>
                ))}
                <div className="bg-white border border-[var(--line)] rounded-xl p-3.5">
                  <div className="text-[11px] text-[var(--ink-3)] font-semibold uppercase tracking-[0.06em]">Fees</div>
                  <div className="mt-1.5">
                    {student.fees === 'paid'    && <Badge variant="mint">Paid</Badge>}
                    {student.fees === 'due'     && <Badge variant="amber">Due ₹2,400</Badge>}
                    {student.fees === 'overdue' && <Badge variant="rose">Overdue ₹4,800</Badge>}
                  </div>
                </div>
              </div>

              {/* Guardian */}
              <div className="bg-white border border-[var(--line)] rounded-xl mb-4">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
                  <h3 className="text-[16px] font-semibold">Guardian</h3>
                  <button className="text-[12px] font-semibold text-[var(--scholar-600)]">Edit</button>
                </div>
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-semibold flex-shrink-0"
                    style={{ background: avatarColor(student.guardian) }}
                  >
                    {initials(student.guardian)}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-[14px]">{student.guardian}</div>
                    <div className="text-[12px] text-[var(--ink-2)]">
                      +91 98765 43210 · {student.guardian.split(' ')[0].toLowerCase()}@gmail.com
                    </div>
                  </div>
                  <button className="w-9 h-9 rounded-lg border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] cursor-pointer">
                    <MessageSquare size={16} />
                  </button>
                </div>
              </div>

              {/* Recent activity */}
              <div className="bg-white border border-[var(--line)] rounded-xl">
                <div className="px-5 py-4 border-b border-[var(--line)]">
                  <h3 className="text-[16px] font-semibold">Recent activity</h3>
                </div>
                {activity.map(({ icon: Icon, label, when }, i) => (
                  <div
                    key={i}
                    className={cn('flex items-center gap-3 px-5 py-3', i > 0 && 'border-t border-[var(--line)]')}
                  >
                    <span className="w-8 h-8 rounded-lg bg-[var(--scholar-50)] text-[var(--scholar-700)] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} />
                    </span>
                    <div className="flex-1">
                      <div className="text-[13px] font-medium">{label}</div>
                      <div className="text-[11px] text-[var(--ink-3)]">{when}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex gap-2.5 px-6 py-3.5 border-t border-[var(--line)] bg-white">
              <button className="flex-1 h-9 rounded-[10px] border border-[var(--line-strong)] bg-white text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
                View report card
              </button>
              <button className="flex-1 h-9 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium inline-flex items-center justify-center gap-1.5 hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
                <MessageSquare size={14} /> Message parent
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
