import { useState } from 'react'
import { PenSquare, Phone, MoreHorizontal, Paperclip, Send } from 'lucide-react'
import { THREADS } from '@/data'
import { initials, cn } from '@/lib/utils'

export function Messages() {
  const [open, setOpen] = useState(2)
  const thread = THREADS.find(x => x.id === open)!

  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Messages</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">Inbox · 2 unread · Connected to parents and staff</div>
        </div>
        <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
          <PenSquare size={14} /> New message
        </button>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '320px 1fr', height: 'calc(100vh - 230px)' }}>
        {/* Thread list */}
        <div className="bg-white border border-[var(--line)] rounded-xl overflow-auto shadow-[var(--shadow-1)]">
          {THREADS.map(x => (
            <div
              key={x.id}
              onClick={() => setOpen(x.id)}
              className={cn(
                'flex gap-2.5 px-4 py-3.5 border-b border-[var(--line)] cursor-pointer',
                open === x.id ? 'bg-[var(--scholar-50)]' : 'hover:bg-[var(--surface-sunken)]'
              )}
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-semibold flex-shrink-0"
                style={{ background: x.color }}
              >
                {initials(x.from)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div className={cn('text-[13px]', x.unread ? 'font-bold' : 'font-semibold')}>{x.from}</div>
                  <div className="text-[11px] text-[var(--ink-3)]">{x.t}</div>
                </div>
                <div className="text-[11px] text-[var(--ink-3)] mb-1">{x.role}</div>
                <div className={cn(
                  'text-[12px] truncate',
                  x.unread ? 'text-[var(--ink-1)]' : 'text-[var(--ink-2)]'
                )}>
                  {x.preview}
                </div>
              </div>
              {x.unread && (
                <span className="w-2 h-2 rounded-full bg-[var(--coral-500)] flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>

        {/* Thread view */}
        <div className="bg-white border border-[var(--line)] rounded-xl flex flex-col shadow-[var(--shadow-1)]">
          {/* Head */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
            <div className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-semibold"
                style={{ background: thread.color }}
              >
                {initials(thread.from)}
              </span>
              <div>
                <div className="font-semibold text-[15px]">{thread.from}</div>
                <div className="text-[11px] text-[var(--ink-3)]">{thread.role}</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] cursor-pointer">
                <Phone size={17} />
              </button>
              <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] cursor-pointer">
                <MoreHorizontal size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-5 flex flex-col gap-3.5">
            {[
              { text: thread.preview, self: false },
              { text: 'I have a clinic appointment on Wed at 4 — could we shift PTM to Friday at 4 instead? Apologies for the late notice.', self: false },
              { text: "Friday 4pm works. I'll send a calendar update to all 28 parents in 4A.", self: true },
              { text: 'Lifesaver — thank you 🙏', self: false },
            ].map((m, i) => (
              <div
                key={i}
                className={cn(
                  'max-w-[70%] px-3.5 py-2.5 text-[13px]',
                  m.self
                    ? 'self-end bg-[var(--scholar-600)] text-white rounded-[14px_14px_4px_14px]'
                    : 'self-start bg-[var(--surface-sunken)] text-[var(--ink-1)] rounded-[14px_14px_14px_4px]'
                )}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Reply */}
          <div className="flex items-center gap-2.5 px-4 py-3.5 border-t border-[var(--line)]">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] cursor-pointer">
              <Paperclip size={17} />
            </button>
            <input
              placeholder={`Reply to ${thread.from}…`}
              className="flex-1 h-[38px] px-3 rounded-lg border border-[var(--line-strong)] bg-white text-[13px] outline-none focus:border-[var(--scholar-600)] focus:shadow-[0_0_0_3px_var(--scholar-50)] transition-all"
            />
            <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
              <Send size={14} /> Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
