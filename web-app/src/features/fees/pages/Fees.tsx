import { useState } from 'react'
import { FileText, Bell, ChevronRight } from 'lucide-react'
import { StatCard } from '@/shared/components/ui/StatCard'
import { Badge } from '@/shared/components/ui/Badge'
import { INVOICES } from '@/data'
import type { Invoice } from '@/types'
import { cn, formatINR } from '@/lib/utils'

const TABS = [['all', 'All'], ['paid', 'Paid'], ['due', 'Due'], ['overdue', 'Overdue'], ['partial', 'Partial']]

function feesBadge(s: Invoice['status']) {
  const map: Record<Invoice['status'], [React.ComponentProps<typeof Badge>['variant'], string]> = {
    paid: ['mint', 'Paid'], due: ['amber', 'Due'],
    overdue: ['rose', 'Overdue'], partial: ['coral', 'Partial'],
  }
  const [variant, label] = map[s]
  return <Badge variant={variant}>{label}</Badge>
}

export function Fees() {
  const [tab, setTab] = useState('all')
  const rows = INVOICES.filter(i => tab === 'all' || i.status === tab)

  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Fees</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">Term 2 · ₹14.2L of ₹16L collected · 89% on track</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <FileText size={14} /> Statements
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
            <Bell size={14} /> Send reminders (3)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard eye="Collected · May"  value="₹14.2" suffix="L" delta="On target" deltaDir="up" foot="89% of ₹16L" />
        <StatCard eye="Outstanding"      value="₹1.8"  suffix="L" foot="34 invoices" />
        <StatCard eye="Overdue"          value="₹42K"  foot="3 invoices · 5–14 days" />
        <StatCard eye="Avg collection"   value="11.2"  suffix=" days" foot="vs 13.5 last term" delta="−2.3 days" deltaDir="up" />
      </div>

      <div className="flex gap-2 mb-4">
        {TABS.map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              'h-[30px] px-3 rounded-full text-[12px] font-medium border transition-all cursor-pointer',
              tab === k
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
              {['Invoice','Student','Grade','Amount','Due','Status','Paid on',''].map((h, i) => (
                <th
                  key={i}
                  className={cn(
                    'px-4 py-2.5 text-[11px] uppercase tracking-[0.04em] font-medium text-[var(--ink-3)] border-b border-[var(--line)]',
                    i === 3 ? 'text-right' : 'text-left'
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(inv => (
              <tr key={inv.id} className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-sunken)] cursor-pointer">
                <td className="px-4 py-3 font-mono text-[12px] text-[var(--ink-3)]">{inv.id}</td>
                <td className="px-4 py-3 font-semibold">{inv.student}</td>
                <td className="px-4 py-3">{inv.grade}</td>
                <td className="px-4 py-3 text-right">{formatINR(inv.amt)}</td>
                <td className="px-4 py-3">{inv.due}</td>
                <td className="px-4 py-3">{feesBadge(inv.status)}</td>
                <td className="px-4 py-3 text-[12px] text-[var(--ink-2)]">{inv.paid}</td>
                <td className="px-4 py-3"><ChevronRight size={16} className="text-[var(--ink-3)]" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
