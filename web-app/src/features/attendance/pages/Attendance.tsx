import { Download, CheckSquare } from 'lucide-react'
import { StatCard } from '@/shared/components/ui/StatCard'

const classRows = [
  { c: '4A', t: 'Anita Rao',      present: 30, total: 32, late: 1, abs: 1 },
  { c: '4B', t: 'Priya Banerjee', present: 27, total: 30, late: 2, abs: 1 },
  { c: '5A', t: 'Latha Nair',     present: 34, total: 34, late: 0, abs: 0 },
  { c: '5B', t: 'Anita Rao',      present: 28, total: 31, late: 1, abs: 2 },
  { c: '6A', t: 'Ravi Iyer',      present: 31, total: 33, late: 1, abs: 1 },
  { c: '7A', t: 'Sandeep K.',     present: 26, total: 30, late: 2, abs: 2 },
  { c: '8A', t: 'Kiran Reddy',    present: 26, total: 28, late: 1, abs: 1 },
]

const heat = (d: number) => {
  const v = (Math.sin(d * 0.7) + 1) / 2
  if (v > 0.7) return 'var(--mint-500)'
  if (v > 0.5) return 'var(--mint-300)'
  if (v > 0.3) return 'var(--amber-200)'
  return 'var(--rose-200)'
}

const rateColor = (r: number) =>
  r >= 95 ? 'var(--mint-700)' : r >= 85 ? 'var(--amber-700)' : 'var(--rose-700)'

export function Attendance() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Attendance</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">Today · 11 May · 1,184 of 1,256 marked present (94.2%)</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <Download size={14} /> Export
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
            <CheckSquare size={14} /> Mark by class
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard eye="Present today" value="1,184" delta="94.2%"         deltaDir="up" foot="vs 92.8% last week" />
        <StatCard eye="Late"          value="38"    foot="3.0% of cohort" />
        <StatCard eye="Absent"        value="34"    foot="2.7% · 12 with notes" />
        <StatCard eye="Best class"    value="5A"    foot="100% present, 4 days running" />
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
            <h3 className="text-[16px] font-semibold">By class — today</h3>
            <span className="text-[12px] text-[var(--ink-3)]">Tap row for register</span>
          </div>
          <table className="w-full text-[13px] border-collapse tabnum">
            <thead>
              <tr className="bg-[var(--surface-card)]">
                {['Class', 'Teacher', 'Present', 'Late', 'Absent', 'Rate'].map((h, i) => (
                  <th key={h} className={`px-4 py-2.5 text-[11px] uppercase tracking-[0.04em] font-medium text-[var(--ink-3)] border-b border-[var(--line)] ${i > 1 ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classRows.map(r => {
                const rate = Math.round(r.present / r.total * 100)
                return (
                  <tr key={r.c} className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-sunken)] cursor-pointer">
                    <td className="px-4 py-3"><b>{r.c}</b></td>
                    <td className="px-4 py-3 text-[var(--ink-2)]">{r.t}</td>
                    <td className="px-4 py-3 text-right">{r.present}/{r.total}</td>
                    <td className="px-4 py-3 text-right">{r.late}</td>
                    <td className="px-4 py-3 text-right">{r.abs}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold" style={{ color: rateColor(rate) }}>{rate}%</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-[var(--line)] rounded-xl p-5 shadow-[var(--shadow-1)]">
          <div className="text-[16px] font-semibold mb-3.5">School-wide · last 30 days</div>
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
            {days.map(d => (
              <div
                key={d}
                title={`${d} May`}
                className="rounded aspect-square cursor-pointer"
                style={{ background: heat(d) }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2.5 mt-3.5 text-[11px] text-[var(--ink-3)]">
            <span>Lower</span>
            <div className="flex gap-0.5">
              {['var(--rose-200)', 'var(--amber-200)', 'var(--mint-300)', 'var(--mint-500)'].map(c => (
                <span key={c} className="w-3.5 h-3.5 rounded-[3px]" style={{ background: c }} />
              ))}
            </div>
            <span>Higher</span>
          </div>
          <div className="mt-4 pt-3.5 border-t border-[var(--line)] text-[13px] flex flex-col gap-2">
            {[['Term avg', '93.6%', undefined], ['YoY change', '+2.1%', 'var(--mint-700)'], ['Chronic absence', '4 students', undefined]].map(([l, v, c]) => (
              <div key={l} className="flex justify-between">
                <span className="text-[var(--ink-2)]">{l}</span>
                <b style={c ? { color: c } : undefined}>{v}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
