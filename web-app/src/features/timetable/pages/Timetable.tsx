import { useState } from 'react'
import { Printer, Edit3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const PERIODS = ['08:30', '09:20', '10:10', '11:10', '12:00', '13:30', '14:20', '15:10']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const SUBS = [
  ['Math', '201', 'scholar'], ['English', '203', 'coral'], ['Science', '301', 'mint'],
  ['Hindi', '204', 'amber'], ['Social', '305', 'rose'], ['Computer', '401', 'scholar'],
  ['PE', 'Field', 'mint'], ['Art', 'Studio', 'coral'], ['Music', 'Studio', 'amber'],
] as const

type Slot = { subj: string; room: string; tone: string } | null
const TT: Record<string, Slot[]> = {}
DAYS.forEach((d, di) => {
  TT[d] = PERIODS.map((_, pi) => {
    if (pi === 4) return null
    const s = SUBS[(di * 3 + pi) % SUBS.length]
    return { subj: s[0], room: s[1], tone: s[2] }
  })
})

const CLASSES = ['4A', '4B', '5A', '5B', '6A', '7A', '8A', '10A']

export function Timetable() {
  const [klass, setKlass] = useState('5A')

  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Timetable</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">Term 2 schedule · Effective 1 May – 31 Jul</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <Printer size={14} /> Print
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
            <Edit3 size={14} /> Edit
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {CLASSES.map(k => (
          <button
            key={k}
            onClick={() => setKlass(k)}
            className={cn(
              'h-[30px] px-3 rounded-full text-[12px] font-medium border transition-all cursor-pointer',
              klass === k
                ? 'bg-[var(--ink-1)] text-white border-[var(--ink-1)]'
                : 'bg-white text-[var(--ink-1)] border-[var(--line-strong)] hover:bg-[var(--surface-sunken)]'
            )}
          >
            Grade {k}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[var(--line)] rounded-xl overflow-hidden shadow-[var(--shadow-1)]">
        <div className="grid text-[12px]" style={{ gridTemplateColumns: `80px repeat(${DAYS.length}, 1fr)` }}>
          <div className="px-3 py-3.5 border-b border-[var(--line)] bg-[var(--surface-card)] text-[11px] uppercase tracking-[0.04em] font-semibold text-[var(--ink-3)]">
            Time
          </div>
          {DAYS.map(d => (
            <div key={d} className="px-3 py-3.5 border-b border-[var(--line)] border-l border-l-[var(--line)] bg-[var(--surface-card)] font-semibold text-[13px]">
              {d}
            </div>
          ))}

          {PERIODS.map((time, pi) => (
            <>
              <div key={`t-${pi}`} className="px-3 py-3.5 border-b border-[var(--line)] font-mono text-[11px] text-[var(--ink-2)]">
                {time}
              </div>
              {DAYS.map(d => {
                const slot = TT[d][pi]
                return (
                  <div key={`${d}-${pi}`} className="p-2 border-b border-[var(--line)] border-l border-l-[var(--line)]">
                    {!slot ? (
                      <div className="h-full flex items-center justify-center text-[11px] text-[var(--ink-3)] italic bg-[var(--surface-sunken)] rounded px-2 py-1.5">
                        Lunch
                      </div>
                    ) : (
                      <div
                        className="px-2.5 py-2 rounded-md"
                        style={{
                          background: `var(--${slot.tone}-50)`,
                          borderLeft: `3px solid var(--${slot.tone}-500)`,
                        }}
                      >
                        <div className="font-semibold text-[12px]" style={{ color: `var(--${slot.tone}-700)` }}>
                          {slot.subj}
                        </div>
                        <div className="text-[10px] text-[var(--ink-3)] mt-0.5">Room {slot.room}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>
    </>
  )
}
