export function FeesAreaChart() {
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']
  const collected = [62, 70, 68, 78, 82, 88, 92, 96]
  const W = 540, H = 200, P = 32
  const x = (i: number) => P + (i / (weeks.length - 1)) * (W - 2 * P)
  const y = (v: number) => H - P - (v / 100) * (H - 2 * P)
  const line = collected.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ')
  const area = `${line} L${x(weeks.length - 1)} ${H - P} L${x(0)} ${H - P} Z`

  return (
    <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
        <h3 className="text-[16px] font-semibold">Fee collection · last 8 weeks</h3>
        <div className="flex gap-3.5 text-[12px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-[2px]" style={{ background: 'var(--scholar-600)' }} />
            Collected
          </span>
          <span className="inline-flex items-center gap-1.5 text-[var(--ink-2)]">
            <span className="w-2 h-2 rounded-[2px]" style={{ background: 'var(--coral-500)' }} />
            Target
          </span>
        </div>
      </div>
      <div className="px-5 py-4">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H}>
          <defs>
            <linearGradient id="fillG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5B5BE5" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#5B5BE5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 25, 50, 75, 100].map(g => (
            <line key={g} x1={P} x2={W - P} y1={y(g)} y2={y(g)} stroke="var(--line)" strokeWidth="1" />
          ))}
          <line x1={P} x2={W - P} y1={y(85)} y2={y(85)} stroke="var(--coral-500)" strokeDasharray="4 4" strokeWidth="1.5" />
          <path d={area} fill="url(#fillG)" />
          <path d={line} fill="none" stroke="#5B5BE5" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {collected.map((v, i) => (
            <circle
              key={i}
              cx={x(i)} cy={y(v)}
              r={i === collected.length - 1 ? 5 : 3.5}
              fill="#5B5BE5" stroke="#fff" strokeWidth="2"
            />
          ))}
          {weeks.map((w, i) => (
            <text key={i} x={x(i)} y={H - 10} textAnchor="middle" fontSize="10" fill="var(--ink-3)" fontFamily="JetBrains Mono, monospace">
              {w}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}
