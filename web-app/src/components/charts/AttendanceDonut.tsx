export function AttendanceDonut() {
  const r = 60
  const c = 2 * Math.PI * r
  const arcs = [
    { color: 'var(--mint-500)',  pct: 94.2, label: 'Present', val: '1,184' },
    { color: 'var(--amber-500)', pct: 3.0,  label: 'Late',    val: '38' },
    { color: 'var(--rose-500)',  pct: 2.8,  label: 'Absent',  val: '34' },
  ]
  let acc = 0

  return (
    <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
        <h3 className="text-[16px] font-semibold">Attendance · today</h3>
        <span className="text-[12px] text-[var(--ink-3)]">Auto-refreshes every 5 min</span>
      </div>
      <div className="grid gap-6 p-6" style={{ gridTemplateColumns: '180px 1fr', alignItems: 'center' }}>
        {/* Donut */}
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 160 160" width="160" height="160">
            <circle cx="80" cy="80" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth="14" />
            {arcs.map((a, i) => {
              const len = (a.pct / 100) * c
              const off = -((acc / 100) * c)
              acc += a.pct
              return (
                <circle
                  key={i}
                  cx="80" cy="80" r={r}
                  fill="none"
                  stroke={a.color}
                  strokeWidth="14"
                  strokeLinecap="butt"
                  strokeDasharray={`${len} ${c - len}`}
                  strokeDashoffset={off}
                  transform="rotate(-90 80 80)"
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-semibold text-[32px] leading-none tracking-[-0.02em]">94.2%</div>
            <div className="text-[11px] text-[var(--ink-3)] mt-1">1,184 of 1,256</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5">
          {arcs.map(({ color, label, val, pct }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="flex-1 text-[13px] text-[var(--ink-1)]">{label}</span>
              <span className="font-mono text-[13px] text-[var(--ink-2)]">{val}</span>
              <span className="font-mono text-[11px] text-[var(--ink-3)] w-12 text-right">{pct}%</span>
            </div>
          ))}
          <div className="h-px bg-[var(--line)] my-1" />
          <div className="flex items-center justify-between">
            <div className="text-[12px] text-[var(--ink-2)]">
              Lowest class · <b className="text-[var(--ink-1)]">Grade 9C · 82%</b>
            </div>
            <button className="text-[12px] font-semibold text-[var(--scholar-600)] hover:underline">View by class →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
