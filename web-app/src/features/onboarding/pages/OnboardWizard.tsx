import { useState } from 'react'
import {
  Check, X, ArrowLeft, ArrowRight, Send, Info, Mail, Plus,
  GraduationCap, TrendingUp, Rocket, CheckSquare, CalendarClock,
  MessageSquare, Receipt, Library, Bus, Utensils, BookOpenCheck,
  Pencil, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Plan = 'Starter' | 'Growth' | 'Scale'
type ModKey = 'messaging' | 'fees' | 'library' | 'transport' | 'canteen' | 'lms'

interface WizardData {
  name: string; code: string; type: string; board: string; city: string; state: string
  plan: Plan; seats: number
  adminFirst: string; adminLast: string; adminEmail: string; adminRole: string
  modules: Record<ModKey, boolean>
}

type SetFn = <K extends keyof WizardData>(k: K, v: WizardData[K]) => void

const DEFAULT_DATA: WizardData = {
  name: 'Maplewood International', code: 'MWI-2026',
  type: 'K-12 (Kindergarten to Grade 12)', board: 'CBSE',
  city: 'Jaipur', state: 'Rajasthan',
  plan: 'Scale', seats: 1500,
  adminFirst: 'Arjun', adminLast: 'Mehta',
  adminEmail: 'principal@maplewood.edu', adminRole: 'Principal',
  modules: { messaging: true, fees: true, library: false, transport: false, canteen: false, lms: false },
}

const planRate = (p: Plan) => p === 'Starter' ? 6 : p === 'Growth' ? 9 : 12

const SA_STEPS = [
  { key: 'basics',  label: 'School basics' },
  { key: 'plan',    label: 'Plan & seats' },
  { key: 'admin',   label: 'Primary admin' },
  { key: 'modules', label: 'Modules included' },
  { key: 'review',  label: 'Review & invite' },
]

function Field({
  label, hint, last = false, children,
}: { label: string; hint?: string; last?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-1.5', !last && 'mb-4')}>
      <label className="text-[12px] font-semibold text-[var(--ink-1)]">
        {label}
        {hint && <span className="text-[11px] text-[var(--ink-3)] font-normal ml-1.5">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'h-10 px-3.5 rounded-lg border border-[var(--line-strong)] bg-white text-[14px] text-[var(--ink-1)] outline-none w-full ' +
  'focus:border-[var(--scholar-600)] focus:shadow-[0_0_0_3px_var(--scholar-50)] transition-all'

function StepBasics({ data, set }: { data: WizardData; set: SetFn }) {
  return (
    <div className="w-full max-w-[720px] mx-auto">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--scholar-600)] mb-2">Step 1 of 5 · Basics</div>
        <h1 className="font-semibold text-[28px] tracking-[-0.02em] leading-[1.15]">Who are we adding to the district?</h1>
        <p className="text-[14px] text-[var(--ink-2)] mt-2 max-w-[540px]">These details show up on the school card, on parent emails, and on report cards. The school admin can edit anything later.</p>
      </div>
      <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)] p-[22px]">
        <Field label="School name">
          <input className={inputCls} value={data.name} onChange={e => set('name', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3.5">
          <Field label="School code" hint="· auto-generated">
            <input className={cn(inputCls, 'font-mono')} value={data.code} onChange={e => set('code', e.target.value)} />
          </Field>
          <Field label="Board / curriculum">
            <select className={inputCls} value={data.board} onChange={e => set('board', e.target.value)}>
              {['CBSE', 'ICSE', 'State board', 'IB', 'Cambridge'].map(b => <option key={b}>{b}</option>)}
            </select>
          </Field>
        </div>
        <Field label="School type">
          <select className={inputCls} value={data.type} onChange={e => set('type', e.target.value)}>
            {['K-12 (Kindergarten to Grade 12)', 'Primary only', 'Secondary only', 'Higher secondary'].map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3.5">
          <Field label="City" last>
            <input className={inputCls} value={data.city} onChange={e => set('city', e.target.value)} />
          </Field>
          <Field label="State" last>
            <input className={inputCls} value={data.state} onChange={e => set('state', e.target.value)} />
          </Field>
        </div>
      </div>
    </div>
  )
}

const PLANS: { name: Plan; range: string; price: string; maxSeats: number; Icon: React.ElementType; tone: string }[] = [
  { name: 'Starter', range: 'Up to 500 students',   price: '₹ 6 per student/mo',  maxSeats: 500,  Icon: GraduationCap, tone: 'mint' },
  { name: 'Growth',  range: '500 – 1,500 students',  price: '₹ 9 per student/mo',  maxSeats: 1500, Icon: TrendingUp,    tone: 'coral' },
  { name: 'Scale',   range: '1,500+ students · SLA', price: '₹ 12 per student/mo', maxSeats: 5000, Icon: Rocket,        tone: 'scholar' },
]

function StepPlan({ data, set }: { data: WizardData; set: SetFn }) {
  return (
    <div className="w-full max-w-[880px] mx-auto">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--scholar-600)] mb-2">Step 2 of 5 · Plan</div>
        <h1 className="font-semibold text-[28px] tracking-[-0.02em] leading-[1.15]">How big is this school, and what plan fits?</h1>
        <p className="text-[14px] text-[var(--ink-2)] mt-2 max-w-[540px]">Plan drives billing and feature ceilings. The school admin can request a change anytime.</p>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {PLANS.map(({ name, range, price, maxSeats, Icon, tone }) => {
          const on = data.plan === name
          return (
            <div
              key={name}
              onClick={() => { set('plan', name); set('seats', maxSeats) }}
              className={cn(
                'relative border rounded-xl bg-white p-4 cursor-pointer transition-all',
                on ? 'border-[var(--scholar-600)] shadow-[0_0_0_3px_var(--scholar-50)]' : 'border-[var(--line-strong)] hover:border-[var(--ink-3)]'
              )}
            >
              {on && (
                <div className="absolute top-3 right-3 w-[18px] h-[18px] rounded-full bg-[var(--scholar-600)] flex items-center justify-center">
                  <Check size={11} strokeWidth={3.5} className="text-white" />
                </div>
              )}
              <div
                className="w-8 h-8 rounded-lg inline-flex items-center justify-center mb-2.5"
                style={{ background: `var(--${tone}-50)`, color: `var(--${tone}-700)` }}
              >
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <h4 className="text-[14px] font-semibold mb-1">{name}</h4>
              <p className="text-[12px] text-[var(--ink-2)] m-0 leading-[1.45]">{range}</p>
              <div className="text-[12px] text-[var(--ink-3)] mt-2 tabnum">{price}</div>
            </div>
          )
        })}
      </div>
      <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)] p-[22px]">
        <div className="grid grid-cols-2 gap-3.5">
          <Field label="Initial seat count" hint="· students" last>
            <input
              className={cn(inputCls, 'font-mono')}
              type="number"
              value={data.seats}
              onChange={e => set('seats', parseInt(e.target.value) || 0)}
            />
          </Field>
          <Field label="Billing start" last>
            <select className={inputCls}>
              <option>30 days after launch (recommended)</option>
              <option>On invitation acceptance</option>
              <option>Custom date</option>
            </select>
          </Field>
        </div>
        <div className="mt-4 px-3.5 py-3 rounded-[10px] bg-[var(--scholar-50)] flex items-center gap-2.5 text-[13px] text-[var(--ink-2)]">
          <Info size={16} className="text-[var(--scholar-700)] flex-shrink-0" />
          <div>
            Estimated{' '}
            <b className="font-mono text-[var(--ink-1)]">
              ₹ {(data.seats * planRate(data.plan)).toLocaleString('en-IN')}
            </b>
            {' '}/ month at full enrollment · pooled against your district contract.
          </div>
        </div>
      </div>
    </div>
  )
}

function StepAdmin({ data, set }: { data: WizardData; set: SetFn }) {
  return (
    <div className="w-full max-w-[720px] mx-auto">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--scholar-600)] mb-2">Step 3 of 5 · Primary admin</div>
        <h1 className="font-semibold text-[28px] tracking-[-0.02em] leading-[1.15]">Who runs onboarding from the school side?</h1>
        <p className="text-[14px] text-[var(--ink-2)] mt-2 max-w-[540px]">They'll get an email with a setup link and finish the rest of the wizard from their end. They can invite more admins later.</p>
      </div>
      <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)] p-[22px]">
        <div className="grid grid-cols-2 gap-3.5">
          <Field label="First name">
            <input className={inputCls} value={data.adminFirst} onChange={e => set('adminFirst', e.target.value)} />
          </Field>
          <Field label="Last name">
            <input className={inputCls} value={data.adminLast} onChange={e => set('adminLast', e.target.value)} />
          </Field>
        </div>
        <Field label="Work email" hint="· their sign-in">
          <input className={inputCls} value={data.adminEmail} onChange={e => set('adminEmail', e.target.value)} />
        </Field>
        <Field label="Role" last>
          <select className={inputCls} value={data.adminRole} onChange={e => set('adminRole', e.target.value)}>
            {['Principal', 'Vice principal', 'Registrar', 'Operations lead', 'IT / systems'].map(r => <option key={r}>{r}</option>)}
          </select>
        </Field>
      </div>
      <div className="mt-4 bg-[var(--surface-sunken)] border border-[var(--line)] rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Mail size={16} className="text-[var(--scholar-700)] mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-[var(--ink-2)] leading-[1.55] m-0">
            <b className="text-[var(--ink-1)]">{data.adminFirst} {data.adminLast}</b> will receive an email from{' '}
            <span className="font-mono text-[12px]">welcome@eduease.app</span> when you finish. The link expires in 7 days; you can resend or revoke from this school's row.
          </p>
        </div>
      </div>
    </div>
  )
}

const MODULES: { key: ModKey | 'attendance' | 'timetable' | 'grading'; label: string; desc: string; Icon: React.ElementType; core: boolean }[] = [
  { key: 'attendance', label: 'Attendance',             desc: 'Daily roll-call, absence pings to parents.',          Icon: CheckSquare,    core: true },
  { key: 'timetable',  label: 'Timetable',              desc: 'Weekly schedule with substitutions.',                  Icon: CalendarClock,  core: true },
  { key: 'grading',    label: 'Grading & report cards', desc: 'Marks, rubrics, branded term-end PDFs.',               Icon: GraduationCap,  core: true },
  { key: 'messaging',  label: 'Messaging',              desc: 'Teacher ↔ parent threads, quiet hours.',              Icon: MessageSquare,  core: false },
  { key: 'fees',       label: 'Fees & invoicing',       desc: 'Term fees, online payment, GST receipts.',             Icon: Receipt,        core: false },
  { key: 'library',    label: 'Library',                desc: 'Issue & return books, top-borrowed reports.',          Icon: Library,        core: false },
  { key: 'transport',  label: 'Transport',              desc: 'Bus routes, check-ins, live tracking.',                Icon: Bus,            core: false },
  { key: 'canteen',    label: 'Canteen & pre-pay',      desc: 'Wallets, allergy flags, monthly statements.',           Icon: Utensils,       core: false },
  { key: 'lms',        label: 'Lesson plans (LMS)',     desc: 'Assignments, submissions. Beta · Q3 2026.',            Icon: BookOpenCheck,  core: false },
]

function Toggle({ on, disabled, onClick }: { on: boolean; disabled: boolean; onClick: () => void }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={cn(
        'relative w-[34px] h-5 rounded-full flex-shrink-0 cursor-pointer transition-colors duration-150',
        on ? 'bg-[var(--scholar-600)]' : 'bg-[var(--line-strong)]',
        disabled && 'opacity-40 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-transform duration-150',
          on && 'translate-x-3.5'
        )}
      />
    </div>
  )
}

function StepModules({ data, toggleMod }: { data: WizardData; toggleMod: (k: ModKey) => void }) {
  return (
    <div className="w-full max-w-[880px] mx-auto">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--scholar-600)] mb-2">Step 4 of 5 · Modules</div>
        <h1 className="font-semibold text-[28px] tracking-[-0.02em] leading-[1.15]">Which modules ship with this school?</h1>
        <p className="text-[14px] text-[var(--ink-2)] mt-2 max-w-[540px]">Core modules are always on. Pre-enable the optional ones the school has asked for — they can switch others on from Settings.</p>
      </div>
      <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)] overflow-hidden">
        {MODULES.map(({ key, label, desc, Icon, core }, i) => {
          const on = core || (key in data.modules && data.modules[key as ModKey])
          return (
            <div
              key={key}
              className={cn(
                'flex items-center gap-3.5 px-5 py-3.5',
                i > 0 && 'border-t border-[var(--line)]',
                on && !core && 'bg-[var(--scholar-50)/30]'
              )}
            >
              <div
                className={cn(
                  'w-[34px] h-[34px] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                  on ? 'bg-[var(--scholar-50)] text-[var(--scholar-700)]' : 'bg-[var(--surface-sunken)] text-[var(--ink-2)]'
                )}
              >
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <h5 className="text-[13px] font-semibold m-0">
                  {label}
                  {core && <span className="text-[11px] text-[var(--scholar-700)] font-semibold ml-1.5">· Core, always on</span>}
                </h5>
                <p className="text-[12px] text-[var(--ink-2)] mt-0.5 m-0">{desc}</p>
              </div>
              <Toggle
                on={on}
                disabled={core}
                onClick={() => !core && toggleMod(key as ModKey)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StepReview({ data, jumpTo }: { data: WizardData; jumpTo: (i: number) => void }) {
  const optionalOn = Object.values(data.modules).filter(Boolean).length
  const modulesTotal = 3 + optionalOn
  const rows: [string, string, string, number][] = [
    ['School',        data.name,                             `${data.board} · ${data.type} · ${data.city}, ${data.state}`,                                       0],
    ['Plan',          data.plan,                             `${data.seats.toLocaleString('en-IN')} seats · ₹ ${(data.seats * planRate(data.plan)).toLocaleString('en-IN')}/mo est.`, 1],
    ['Primary admin', `${data.adminFirst} ${data.adminLast}`, `${data.adminRole} · ${data.adminEmail}`,                                                         2],
    ['Modules',       `${modulesTotal} enabled`,             `3 core · ${optionalOn} optional`,                                                                 3],
  ]

  return (
    <div className="w-full max-w-[720px] mx-auto">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--scholar-600)] mb-2">Step 5 of 5 · Final review</div>
        <h1 className="font-semibold text-[28px] tracking-[-0.02em] leading-[1.15]">Looks good? We'll send the invite.</h1>
        <p className="text-[14px] text-[var(--ink-2)] mt-2 max-w-[540px]">No data is exposed to staff or parents yet. The school admin opens onboarding next; you can monitor their progress from the All schools list.</p>
      </div>
      <div className="bg-white border border-[var(--line)] rounded-xl shadow-[var(--shadow-1)] overflow-hidden mb-4">
        {rows.map(([k, v, sub, i]) => (
          <div key={k} className="flex items-center gap-3.5 px-5 py-3.5 border-b border-[var(--line)] last:border-0">
            <div className="text-[11px] uppercase tracking-[0.06em] text-[var(--ink-3)] font-semibold w-[130px] flex-shrink-0">{k}</div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold">{v}</div>
              <div className="text-[12px] text-[var(--ink-2)] mt-0.5">{sub}</div>
            </div>
            <button
              onClick={() => jumpTo(i)}
              className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-lg border border-[var(--line-strong)] bg-white text-[12px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors"
            >
              <Pencil size={13} /> Edit
            </button>
          </div>
        ))}
      </div>
      <div className="bg-[var(--scholar-50)] border border-[var(--scholar-100)] rounded-xl p-[18px]">
        <div className="text-[13px] font-semibold mb-2 flex items-center gap-2">
          <Send size={14} className="text-[var(--scholar-700)]" /> When you send the invitation
        </div>
        <ul className="m-0 pl-5 text-[13px] text-[var(--ink-2)] leading-[1.7]">
          <li>{data.adminFirst} gets an email link within 60 seconds.</li>
          <li>The school appears in your All schools list with status <b>Onboarding</b>.</li>
          <li>You're billed only after their first 30 days of active use.</li>
          <li>You can revoke the invitation any time before launch.</li>
        </ul>
      </div>
    </div>
  )
}

function SuccessScreen({ data, onLaunch, onReset }: { data: WizardData; onLaunch: () => void; onReset: () => void }) {
  const optionalOn = Object.values(data.modules).filter(Boolean).length
  return (
    <div className="flex-1 overflow-y-auto flex items-center justify-center p-8">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-[110px] h-[110px] mb-6">
          <div className="absolute inset-0 rounded-full bg-[var(--mint-50)]" />
          <div className="absolute inset-[14px] rounded-full bg-[var(--mint-500)] text-white flex items-center justify-center">
            <Check size={46} strokeWidth={3} />
          </div>
        </div>
        <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--coral-600)] mb-2">
          Invitation sent · {data.name}
        </div>
        <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.15] mb-2.5">
          {data.name} is queued.
        </h1>
        <p className="text-[14px] text-[var(--ink-2)] max-w-[460px] mb-6">
          {data.adminFirst} {data.adminLast} ({data.adminEmail}) just got their setup link. They have 7 days to complete onboarding. You'll see their progress live on the district dashboard.
        </p>
        <div
          className="grid gap-px bg-[var(--line)] border border-[var(--line)] rounded-xl overflow-hidden mb-7 w-full max-w-[560px]"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {[
            ['Plan', data.plan],
            ['Seats', data.seats.toLocaleString('en-IN')],
            ['Modules', String(3 + optionalOn)],
            ['Status', 'Invited'],
          ].map(([k, v]) => (
            <div key={k} className="bg-white px-4 py-3.5 text-left">
              <div className="text-[10px] uppercase tracking-[0.06em] text-[var(--ink-3)] font-semibold">{k}</div>
              <div className="font-semibold text-[20px] tracking-[-0.02em] leading-none mt-1.5 tabnum">{v}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={onLaunch}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors"
          >
            Back to network overview <ArrowRight size={14} />
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors"
          >
            <Plus size={14} /> Onboard another
          </button>
        </div>
      </div>
    </div>
  )
}

export function OnboardWizard({ onClose, onLaunch }: { onClose: () => void; onLaunch: () => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(DEFAULT_DATA)

  const total = SA_STEPS.length
  const isLast = step === total - 1
  const launched = step === total

  const set: SetFn = (k, v) => setData(d => ({ ...d, [k]: v }))
  const toggleMod = (k: ModKey) =>
    setData(d => ({ ...d, modules: { ...d.modules, [k]: !d.modules[k] } }))

  if (launched) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <SuccessScreen
          data={data}
          onLaunch={onLaunch}
          onReset={() => { setData(DEFAULT_DATA); setStep(0) }}
        />
      </div>
    )
  }

  const progress = Math.round((step / (total - 1)) * 100)

  return (
    <div className="flex-1 grid overflow-hidden" style={{ gridTemplateColumns: '280px 1fr' }}>
      <aside className="bg-white border-r border-[var(--line)] flex flex-col overflow-hidden" style={{ padding: '22px 20px' }}>
        <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--ink-3)] font-semibold mb-2">District · Provision</div>
        <h2 className="font-semibold text-[20px] tracking-[-0.02em] leading-[1.2] mb-5">Onboard a school</h2>
        <div className="flex flex-col gap-0.5">
          {SA_STEPS.map((s, i) => {
            const isDone = i < step
            const isCur = i === step
            return (
              <div
                key={s.key}
                onClick={() => isDone && setStep(i)}
                className={cn(
                  'flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] text-[var(--ink-2)] transition-all select-none',
                  isDone && 'text-[var(--ink-1)] cursor-pointer hover:bg-[var(--surface-sunken)]',
                  isCur && 'bg-[var(--scholar-50)] text-[var(--scholar-800)] font-semibold',
                  !isDone && !isCur && 'cursor-default opacity-60'
                )}
              >
                <div className={cn(
                  'w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 border',
                  isDone ? 'bg-[var(--mint-500)] border-[var(--mint-500)] text-white' :
                  isCur  ? 'bg-[var(--scholar-600)] border-[var(--scholar-600)] text-white' :
                           'bg-[var(--surface-sunken)] border-[var(--line)] text-[var(--ink-3)]'
                )}>
                  {isDone ? <Check size={12} strokeWidth={3} /> : i + 1}
                </div>
                <span className="flex-1">{s.label}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-auto pt-4 border-t border-[var(--line)] text-[11px] text-[var(--ink-3)] leading-[1.55]">
          <b className="text-[var(--ink-1)]">What happens next:</b> the school admin you invite below completes the deep setup — staff, students, timetable — guided by their own wizard. Progress streams back to you.
        </div>
      </aside>

      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-7 py-3.5 border-b border-[var(--line)] bg-[var(--surface-page)] flex-shrink-0">
          <div className="flex items-center gap-2 text-[13px] text-[var(--ink-2)]">
            <button onClick={onClose} className="cursor-pointer hover:text-[var(--ink-1)] transition-colors bg-transparent border-none p-0 text-[13px] text-[var(--ink-2)]">
              All schools
            </button>
            <ChevronRight size={14} className="text-[var(--ink-3)]" />
            <span className="text-[var(--ink-1)] font-semibold">Onboard a school</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-40 h-[5px] rounded-full bg-[var(--surface-sunken)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--scholar-600), var(--coral-500))' }}
                />
              </div>
              <span className="text-[12px] text-[var(--ink-2)] tabnum">Step {step + 1} of {total}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] hover:text-[var(--ink-1)] cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-8">
          {step === 0 && <StepBasics   data={data} set={set} />}
          {step === 1 && <StepPlan     data={data} set={set} />}
          {step === 2 && <StepAdmin    data={data} set={set} />}
          {step === 3 && <StepModules  data={data} toggleMod={toggleMod} />}
          {step === 4 && <StepReview   data={data} jumpTo={setStep} />}
        </div>

        <div className="flex items-center justify-between px-7 py-3.5 border-t border-[var(--line)] bg-white flex-shrink-0">
          <button
            onClick={() => step === 0 ? onClose() : setStep(step - 1)}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors"
          >
            {step === 0 ? <><X size={14} /> Cancel</> : <><ArrowLeft size={14} /> Back</>}
          </button>
          <div className="flex items-center gap-1.5 text-[12px] text-[var(--ink-3)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--mint-500)]" />
            Auto-saved as draft
          </div>
          <div>
            {!isLast ? (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors"
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors"
              >
                <Send size={14} /> Send invitation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
