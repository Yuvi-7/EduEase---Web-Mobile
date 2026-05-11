import { cn } from '@/lib/utils'

const rows: [string, number, number][] = [
  ['Grade 4', 96, 280],
  ['Grade 5', 92, 264],
  ['Grade 6', 95, 248],
  ['Grade 7', 88, 232],
  ['Grade 8', 91, 218],
  ['Grade 9', 82, 196],
]

export function ClassBreakdown() {
  return (
    <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
        <h3 className="text-[16px] font-semibold">Attendance by grade</h3>
        <button className="text-[12px] font-semibold text-[var(--scholar-600)] hover:underline">This week →</button>
      </div>
      <div className="px-5 py-4 flex flex-col gap-3.5">
        {rows.map(([name, pct, count]) => {
          const barColor  = pct >= 90 ? 'var(--mint-500)'  : pct >= 85 ? 'var(--amber-500)'  : 'var(--rose-500)'
          const textColor = pct >= 90 ? 'var(--mint-700)'  : pct >= 85 ? 'var(--amber-700)'  : 'var(--rose-700)'
          return (
            <div key={name} className="grid items-center gap-3" style={{ gridTemplateColumns: '80px 1fr 72px 56px' }}>
              <div className="text-[13px] font-semibold">{name}</div>
              <div className="h-2 bg-[var(--surface-sunken)] rounded overflow-hidden">
                <div className="h-full rounded" style={{ width: `${pct}%`, background: barColor }} />
              </div>
              <div className={cn('font-mono text-[12px] text-[var(--ink-2)] text-right')}>{count} students</div>
              <div className="font-mono text-[13px] font-semibold text-right" style={{ color: textColor }}>
                {pct}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
