import { Download, Send } from 'lucide-react'
import { StatCard } from '@/shared/components/ui/StatCard'
import { AttendanceDonut } from '../components/AttendanceDonut'
import { FeesAreaChart } from '../components/FeesAreaChart'
import { ClassBreakdown } from '../components/ClassBreakdown'
import type { Student } from '@/types'

interface DashboardProps {
  onOpenStudent?: (s: Student) => void
}

const schedule = [
  ['09:00', 'Staff briefing',       'All teachers · Conference room', 'scholar'],
  ['11:30', 'Term 2 fee deadline',  'Reminder to be sent',           'coral'],
  ['14:00', 'PTM · Grade 8',        '3 parents confirmed',           'scholar'],
  ['16:30', 'Sports meet planning', 'With coach Anand',              'neutral'],
] as const

export function Dashboard(_: DashboardProps) {
  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Good morning, Maya</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">Monday, 11 May · Term 2 · Week 4</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <Download size={14} /> Export
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
            <Send size={14} /> Send announcement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard eye="Today's attendance" value="94.2" suffix="%" delta="1.4%"          deltaDir="up" foot="1,184 of 1,256 present" />
        <StatCard eye="Active students"    value="1,256" delta="12 this term"             deltaDir="up" foot="across 42 classes" />
        <StatCard eye="Fees collected · May" value="₹14.2" suffix="L"                    foot="On track for ₹16L target" spark={[30, 55, 42, 65, 50, 78, 90]} />
        <StatCard eye="Open requests"      value="7"    delta="2 since yesterday"         deltaDir="up" foot="3 leave · 4 admission" />
      </div>

      <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <AttendanceDonut />
        <ClassBreakdown />
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <FeesAreaChart />
        <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
            <h3 className="text-[16px] font-semibold">Today's schedule</h3>
            <button className="text-[12px] font-semibold text-[var(--scholar-600)] hover:underline">Full calendar →</button>
          </div>
          {schedule.map(([t, title, sub, tone], i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 px-5 py-3.5"
              style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}
            >
              <div className="font-mono text-[12px] text-[var(--ink-2)] w-12 flex-shrink-0">{t}</div>
              <div
                className="w-[3px] self-stretch rounded-[2px] flex-shrink-0"
                style={{ background: tone === 'neutral' ? 'var(--line-strong)' : `var(--${tone}-500)` }}
              />
              <div className="flex-1">
                <div className="text-[13px] font-semibold">{title}</div>
                <div className="text-[12px] text-[var(--ink-3)]">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
