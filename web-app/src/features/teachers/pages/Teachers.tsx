import { useState } from 'react'
import { Upload, Plus, ChevronRight } from 'lucide-react'
import { Avatar } from '@/shared/components/ui/Avatar'
import { Badge } from '@/shared/components/ui/Badge'
import { TEACHERS } from '@/data'
import { cn } from '@/lib/utils'

const FILTERS = [
  ['all', 'All'], ['math', 'Math'], ['scien', 'Science'],
  ['english', 'English'], ['hindi', 'Hindi'], ['social', 'Social'],
]

export function Teachers() {
  const [filter, setFilter] = useState('all')
  const rows = TEACHERS.filter(t => filter === 'all' || t.subj.toLowerCase().startsWith(filter))

  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Teachers</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">{TEACHERS.length} faculty · 1 on leave · Avg load 19h/wk</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <Upload size={14} /> Import
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
            <Plus size={14} /> Add teacher
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {FILTERS.map(([k, l]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={cn(
              'h-[30px] px-3 rounded-full text-[12px] font-medium border transition-all cursor-pointer',
              filter === k
                ? 'bg-[var(--ink-1)] text-white border-[var(--ink-1)]'
                : 'bg-white text-[var(--ink-1)] border-[var(--line-strong)] hover:bg-[var(--surface-sunken)]'
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[var(--line)] rounded-xl overflow-hidden shadow-[var(--shadow-1)]">
        <table className="w-full text-[13px] border-collapse tabnum">
          <thead>
            <tr className="bg-[var(--surface-card)]">
              {['Teacher', 'ID', 'Subject', 'Classes', 'Status', 'Load', ''].map((h, i) => (
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
            {rows.map(t => (
              <tr key={t.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-sunken)] cursor-pointer">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={t.name} size="md" />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-[11px] text-[var(--ink-3)]">{t.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-mono text-[12px] text-[var(--ink-3)]">{t.id}</td>
                <td className="px-4 py-3.5">{t.subj}</td>
                <td className="px-4 py-3.5 text-[12px] text-[var(--ink-2)]">{t.classes}</td>
                <td className="px-4 py-3.5">
                  {t.status === 'active'
                    ? <Badge variant="mint" dot>Active</Badge>
                    : <Badge variant="amber">On leave</Badge>
                  }
                </td>
                <td className="px-4 py-3.5 text-right">{t.load}h</td>
                <td className="px-4 py-3.5">
                  <ChevronRight size={16} className="text-[var(--ink-3)]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
