import { Calendar, Download, ChevronRight, TrendingDown, CreditCard, UserX } from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Badge } from '@/components/shared/Badge'
import { SCHOOLS } from '@/data'
import type { School } from '@/types'
import { cn } from '@/lib/utils'

function MiniSpark({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`).join(' ')
  return (
    <svg width="80" height="28" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function planBadge(plan: School['plan']) {
  if (plan === 'Scale')   return <Badge variant="scholar">Scale</Badge>
  if (plan === 'Growth')  return <Badge variant="coral">Growth</Badge>
  return <Badge variant="neutral">Starter</Badge>
}

const toneColor = (t: School['tone']) =>
  t === 'rose' ? '#E14B6A' : t === 'amber' ? '#F0A52A' : '#5B5BE5'

const attColor = (v: number) =>
  v >= 92 ? 'var(--mint-700)' : v >= 88 ? 'var(--amber-700)' : 'var(--rose-700)'

const flagged = [
  { school: 'Hillcrest Day · Delhi',    msg: 'Attendance trending down · 86.3%, −4 pts in 2 weeks', tone: 'rose',    Icon: TrendingDown },
  { school: 'Rosewood High · Mumbai',   msg: 'Fee collection at 74%, target 85% by 15 May',          tone: 'amber',   Icon: CreditCard  },
  { school: 'Cedar Ridge · Hyderabad',  msg: 'Vacancy: Math teacher (Grade 9) · open 18 days',       tone: 'scholar', Icon: UserX       },
]

export function NetworkOverview() {
  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Network overview</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">8 schools · 11,294 students · 681 teachers · Q1 FY26</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <Calendar size={14} /> May 2026
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard eye="Network attendance" value="92.4" suffix="%" delta="+1.6%"         deltaDir="up"  foot="vs Apr · 7 of 8 up" />
        <StatCard eye="Fee collection"     value="₹3.4" suffix=" Cr" delta="86% of target" deltaDir="up" foot="2 schools below 75%" />
        <StatCard eye="Active staff"        value="681" delta="+12 this term"            deltaDir="up"  foot="Avg load 19 hrs/wk" />
        <StatCard eye="Net Promoter"        value="62"  delta="+8 vs last quarter"       deltaDir="up"  foot="Across 1,428 surveys" />
      </div>

      {/* Schools table */}
      <div className="bg-white border border-[var(--line)] rounded-xl overflow-hidden shadow-[var(--shadow-1)] mb-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
          <h3 className="text-[16px] font-semibold">Schools</h3>
          <div className="flex gap-1.5">
            {[['All', true], ['Scale', false], ['Growth', false], ['Starter', false]].map(([l, a]) => (
              <button
                key={l as string}
                className={cn(
                  'h-[30px] px-3 rounded-full text-[12px] font-medium border transition-all cursor-pointer',
                  a
                    ? 'bg-[var(--ink-1)] text-white border-[var(--ink-1)]'
                    : 'bg-white text-[var(--ink-1)] border-[var(--line-strong)] hover:bg-[var(--surface-sunken)]'
                )}
              >
                {l}
              </button>
            ))}
            <button className="h-[30px] px-3 rounded-full text-[12px] font-medium border border-[var(--rose-300)] text-[var(--rose-700)] bg-white hover:bg-[var(--rose-50)] cursor-pointer transition-colors">
              Needs attention · 2
            </button>
          </div>
        </div>
        <table className="w-full text-[13px] border-collapse tabnum">
          <thead>
            <tr className="bg-[var(--surface-card)]">
              {['School', 'City', 'Students', 'Staff', 'Attendance', 'Fee · May', '30-day trend', 'Plan', ''].map((h, i) => (
                <th
                  key={i}
                  className={cn(
                    'px-4 py-2.5 text-[11px] uppercase tracking-[0.04em] font-medium text-[var(--ink-3)] border-b border-[var(--line)]',
                    i >= 2 && i <= 5 ? 'text-right' : 'text-left'
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCHOOLS.map(s => (
              <tr key={s.name} className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-sunken)] cursor-pointer">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `var(--${s.tone}-50)` }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: `var(--${s.tone}-700)` }}>
                        {s.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-[11px] text-[var(--ink-3)]">Joined Jul 2024</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[var(--ink-2)]">{s.city}</td>
                <td className="px-4 py-3.5 text-right">{s.students.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3.5 text-right">{s.teachers}</td>
                <td className="px-4 py-3.5 text-right">
                  <span className="font-semibold" style={{ color: attColor(s.attend) }}>{s.attend}%</span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <span
                    className="font-semibold"
                    style={{ color: s.fee >= 85 ? 'var(--mint-700)' : s.fee >= 75 ? 'var(--amber-700)' : 'var(--rose-700)' }}
                  >
                    {s.fee}%
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <MiniSpark data={s.trend} color={toneColor(s.tone)} />
                </td>
                <td className="px-4 py-3.5">{planBadge(s.plan)}</td>
                <td className="px-4 py-3.5">
                  <ChevronRight size={16} className="text-[var(--ink-3)]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        {/* Flagged schools */}
        <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
            <h3 className="text-[16px] font-semibold">Schools needing attention</h3>
            <span className="text-[12px] text-[var(--ink-3)]">Auto-flagged</span>
          </div>
          {flagged.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 px-5 py-3.5"
              style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `var(--${r.tone}-50)` }}
              >
                <r.Icon size={18} style={{ color: `var(--${r.tone}-700)` }} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[13px]">{r.school}</div>
                <div className="text-[12px] text-[var(--ink-2)] mt-0.5">{r.msg}</div>
              </div>
              <button className="h-8 px-3 rounded-lg border border-[var(--line-strong)] bg-white text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
                Open
              </button>
            </div>
          ))}
        </div>

        {/* Billing */}
        <div className="bg-white border border-[var(--line)] rounded-xl p-5 shadow-[var(--shadow-1)]">
          <div className="text-[15px] font-semibold mb-3.5">Licensing & billing</div>
          {[
            ['Total seats',      '11,975'],
            ['Active',           '11,294 (94%)'],
            ['Renews',           '14 Jul 2026'],
            ['Annual contract',  '₹84.6 L'],
          ].map(([l, v], i) => (
            <div key={l} className="flex justify-between py-2.5 text-[13px]" style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}>
              <span className="text-[var(--ink-2)]">{l}</span>
              <b>{v}</b>
            </div>
          ))}
          <button className="w-full mt-3.5 h-9 rounded-[10px] border border-[var(--line-strong)] bg-white text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            View invoice history
          </button>
        </div>
      </div>
    </>
  )
}
