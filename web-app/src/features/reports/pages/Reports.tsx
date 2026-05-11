import { Calendar, Download } from 'lucide-react'
import { StatCard } from '@/shared/components/ui/StatCard'

const dist = [
  { grade: 'A+', n: 148, w: '74%' }, { grade: 'A',  n: 226, w: '92%' }, { grade: 'A−', n: 312, w: '100%' },
  { grade: 'B+', n: 284, w: '86%' }, { grade: 'B',  n: 158, w: '62%' }, { grade: 'C',  n: 78,  w: '34%'  },
  { grade: 'D',  n: 42,  w: '18%' },
]

const subjects = [
  ['Mathematics',   82.1, 'mint'],    ['Computer Sci', 81.4, 'scholar'],
  ['Hindi',         79.8, 'amber'],   ['English',      78.6, 'coral'],
  ['Science',       77.2, 'rose'],    ['Social Studies',74.4, 'scholar'],
]

export function Reports() {
  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Reports</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">Term 2 · Generated 11 May · Auto-refresh nightly</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <Calendar size={14} /> Term 2
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard eye="Avg academic score" value="78.4" suffix="/100" delta="+3.2 vs T1" deltaDir="up" foot="↑ in 8 of 10 grades" />
        <StatCard eye="Avg attendance"     value="93.6" suffix="%"    delta="+2.1%"      deltaDir="up" foot="vs same term last year" />
        <StatCard eye="On-time fee rate"   value="87"   suffix="%"    delta="+5%"        deltaDir="up" foot="best in 3 years" />
        <StatCard eye="Teacher retention"  value="96"   suffix="%"    foot="2 vacancies open" />
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
            <h3 className="text-[16px] font-semibold">Grade distribution · all subjects</h3>
            <span className="text-[12px] text-[var(--ink-3)]">1,248 reports</span>
          </div>
          <div className="px-5 py-4 flex flex-col gap-2.5">
            {dist.map(d => (
              <div key={d.grade} className="grid items-center gap-3.5" style={{ gridTemplateColumns: '52px 1fr 60px' }}>
                <div className="font-semibold text-[18px]">{d.grade}</div>
                <div className="h-3.5 bg-[var(--surface-sunken)] rounded overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{
                      width: d.w,
                      background: 'linear-gradient(90deg, var(--scholar-500), var(--scholar-700))',
                    }}
                  />
                </div>
                <div className="text-right font-semibold text-[13px] tabnum">{d.n}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[var(--line)] rounded-xl p-5 shadow-[var(--shadow-1)]">
          <div className="text-[15px] font-semibold mb-3.5">Top performing subjects</div>
          {subjects.map(([s, v, t]) => (
            <div key={s} className="flex items-center gap-3 py-2.5 border-t border-[var(--line)] first:border-0 text-[13px]">
              <div className="flex-1 font-medium">{s}</div>
              <div className="flex-1 h-1.5 bg-[var(--surface-sunken)] rounded overflow-hidden">
                <div className="h-full rounded" style={{ width: `${v}%`, background: `var(--${t}-500)` }} />
              </div>
              <div className="w-10 text-right font-semibold tabnum">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
