import { useState } from 'react'
import { ChevronRight, Download, Columns, ChevronLeft } from 'lucide-react'
import { Avatar } from '@/shared/components/ui/Avatar'
import { Badge } from '@/shared/components/ui/Badge'
import { STUDENTS } from '@/data'
import type { Student } from '@/types'
import { cn } from '@/lib/utils'

interface StudentsTableProps {
  onOpen?: (s: Student) => void
  filter?: string
  search?: string
}

export function StudentsTable({ onOpen, filter = 'all', search }: StudentsTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const rows = STUDENTS
    .filter(s => filter === 'all' || s.grade.startsWith(filter))
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search.toUpperCase()))

  const toggleAll = () => {
    if (selected.size === rows.length) setSelected(new Set())
    else setSelected(new Set(rows.map(r => r.id)))
  }

  const toggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const attendanceColor = (v: number) =>
    v >= 90 ? 'var(--mint-700)' : v >= 80 ? 'var(--amber-700)' : 'var(--rose-700)'

  return (
    <div className="bg-white border border-[var(--line)] rounded-xl overflow-hidden shadow-[var(--shadow-1)]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--line)]">
        <span className="text-[13px] text-[var(--ink-2)]">Showing</span>
        <span className="text-[13px] text-[var(--ink-1)] font-semibold">{rows.length} students</span>
        <div className="flex-1" />
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer">
          <Download size={14} /> Export
        </button>
        <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[13px] font-medium bg-white border border-[var(--line-strong)] text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer">
          <Columns size={14} /> Columns
        </button>
      </div>

      <table className="w-full text-[13px] border-collapse tabnum">
        <thead>
          <tr className="bg-[var(--surface-card)]">
            <th className="w-9 px-4 py-2.5 text-left border-b border-[var(--line)]">
              <input
                type="checkbox"
                checked={selected.size === rows.length && rows.length > 0}
                onChange={toggleAll}
                className="rounded cursor-pointer"
              />
            </th>
            {['Student', 'ID', 'Grade', 'Guardian', 'Fees', 'Attendance', ''].map((h, i) => (
              <th
                key={i}
                className={cn(
                  'px-4 py-2.5 text-[11px] uppercase tracking-[0.04em] font-medium text-[var(--ink-3)] border-b border-[var(--line)]',
                  i === 5 ? 'text-right' : 'text-left'
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(s => (
            <tr
              key={s.id}
              onClick={() => onOpen?.(s)}
              className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors"
            >
              <td className="px-4 py-3.5">
                <input
                  type="checkbox"
                  checked={selected.has(s.id)}
                  onChange={() => {}}
                  onClick={e => toggle(s.id, e)}
                  className="rounded cursor-pointer"
                />
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Avatar name={s.name} size="md" />
                  <span className="font-semibold">{s.name}</span>
                </div>
              </td>
              <td className="px-4 py-3.5 font-mono text-[12px] text-[var(--ink-3)]">{s.id}</td>
              <td className="px-4 py-3.5">Grade {s.grade}</td>
              <td className="px-4 py-3.5">{s.guardian}</td>
              <td className="px-4 py-3.5">
                {s.fees === 'paid'    && <Badge variant="mint">Paid</Badge>}
                {s.fees === 'due'     && <Badge variant="amber">Due</Badge>}
                {s.fees === 'overdue' && <Badge variant="rose">Overdue</Badge>}
              </td>
              <td className="px-4 py-3.5 text-right">
                <span className="font-semibold" style={{ color: attendanceColor(s.attendance) }}>
                  {s.attendance}%
                </span>
              </td>
              <td className="px-4 py-3.5">
                <ChevronRight size={16} className="text-[var(--ink-3)]" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-5 py-3.5 border-t border-[var(--line)]">
        <div className="text-[12px] text-[var(--ink-3)]">Showing 1–{rows.length} of 1,256</div>
        <div className="flex gap-1.5">
          <button className="w-9 h-9 rounded-lg border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3].map(p => (
            <button
              key={p}
              className={cn(
                'w-9 h-9 rounded-lg text-[13px] font-medium cursor-pointer',
                p === 1
                  ? 'border border-[var(--line-strong)] bg-white text-[var(--ink-1)] hover:bg-[var(--surface-sunken)]'
                  : 'text-[var(--ink-1)] hover:bg-[var(--surface-sunken)]'
              )}
            >
              {p}
            </button>
          ))}
          <button className="w-9 h-9 rounded-lg border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
