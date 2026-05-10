import { UserPlus } from 'lucide-react'
import { Avatar } from '@/components/shared/Avatar'
import { Badge } from '@/components/shared/Badge'
import { PARENTS } from '@/data'

export function Parents() {
  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Parents</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">{PARENTS.length} contacts · 1 pending invite</div>
        </div>
        <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
          <UserPlus size={14} /> Invite
        </button>
      </div>

      <div className="bg-white border border-[var(--line)] rounded-xl overflow-hidden shadow-[var(--shadow-1)]">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-[var(--surface-card)]">
              {['Parent', 'Linked to', 'Email', 'Status'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[11px] uppercase tracking-[0.04em] font-medium text-[var(--ink-3)] border-b border-[var(--line)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PARENTS.map(p => (
              <tr key={p.name} className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-sunken)] cursor-pointer">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={p.name} size="md" />
                    <span className="font-semibold">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[var(--ink-2)]">{p.linked}</td>
                <td className="px-4 py-3.5 font-mono text-[12px] text-[var(--ink-3)]">{p.email}</td>
                <td className="px-4 py-3.5">
                  {p.status === 'Active'
                    ? <Badge variant="mint">Active</Badge>
                    : <Badge variant="amber">Pending</Badge>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
