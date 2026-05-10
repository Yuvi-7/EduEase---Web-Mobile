import { Plus } from 'lucide-react'
import { Avatar } from '@/components/shared/Avatar'
import { Badge } from '@/components/shared/Badge'
import { CLASSES } from '@/data'
import { cn } from '@/lib/utils'

export function Classes() {
  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Classes</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">42 sections across grades 1–10 · {CLASSES.length} shown</div>
        </div>
        <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
          <Plus size={14} /> New section
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {CLASSES.map(c => (
          <div key={c.id} className="bg-white border border-[var(--line)] rounded-xl p-[18px] shadow-[var(--shadow-1)] cursor-pointer hover:shadow-[var(--shadow-2)] transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-[24px] tracking-[-0.02em]">Grade {c.id}</div>
                <div className="text-[12px] text-[var(--ink-3)] mt-0.5">Room {c.room}</div>
              </div>
              <Badge variant="scholar">{c.avgGrade}</Badge>
            </div>

            <div className="border-t border-[var(--line)] mt-3.5 pt-3.5 flex gap-2.5 items-center">
              <Avatar name={c.teacher} size="sm" />
              <div className="text-[12px]">
                <div className="font-semibold">{c.teacher}</div>
                <div className="text-[var(--ink-3)] text-[11px]">Class teacher</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.04em] font-semibold text-[var(--ink-3)]">Students</div>
                <div className="font-semibold text-[15px] mt-0.5">{c.students}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.04em] font-semibold text-[var(--ink-3)]">Attendance</div>
                <div
                  className={cn('font-semibold text-[15px] mt-0.5')}
                  style={{ color: c.attendance >= 92 ? 'var(--mint-700)' : 'var(--amber-700)' }}
                >
                  {c.attendance}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
