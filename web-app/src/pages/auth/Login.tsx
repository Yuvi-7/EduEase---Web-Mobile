import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Eye, EyeOff, Zap, ShieldCheck, GraduationCap, User, AlertCircle } from 'lucide-react'
import { loginSchema, type LoginFormData, CREDENTIAL_MAP } from '@/lib/schemas'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'

// ── Demo account definitions ─────────────────────────────────────────
const DEMO_ACCOUNTS = [
  {
    role: 'School Admin',
    name: 'Maya Singh',
    title: 'Principal · Lakeside Academy',
    email: 'maya@lakeside.edu',
    password: 'admin123',
    icon: GraduationCap,
    accent: 'var(--scholar-600)',
    bg: 'var(--scholar-50)',
    border: 'var(--scholar-200)',
    description: 'Students, teachers, fees, attendance, reports & messaging for one school.',
  },
  {
    role: 'Super Admin',
    name: 'Neha Khan',
    title: 'District Lead · 8 Schools',
    email: 'neha@eduease.com',
    password: 'super123',
    icon: ShieldCheck,
    accent: 'var(--coral-600)',
    bg: 'var(--coral-50)',
    border: 'var(--coral-200)',
    description: 'Network oversight across all schools — billing, licensing & district analytics.',
  },
  {
    role: 'Teacher',
    name: 'Anita Rao',
    title: 'Mathematics · Lakeside Academy',
    email: 'anita@lakeside.edu',
    password: 'teacher123',
    icon: User,
    accent: 'var(--mint-600)',
    bg: 'var(--mint-50)',
    border: 'var(--mint-200)',
    description: 'Manage your classes, mark attendance, upload grades & message parents.',
  },
] as const

type DemoRole = typeof DEMO_ACCOUNTS[number]['role']

// ── Component ────────────────────────────────────────────────────────
export function Login() {
  const login = useAuthStore(s => s.login)
  const [showPass, setShowPass]       = useState(false)
  const [activeDemo, setActiveDemo]   = useState<DemoRole | null>(null)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  })

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[number]) => {
    setValue('email', acc.email, { shouldValidate: true })
    setValue('password', acc.password, { shouldValidate: true })
    setActiveDemo(acc.role)
    setServerError('')
  }

  const onSubmit = (data: LoginFormData) => {
    const key = `${data.email.trim()}::${data.password}`
    const credential = CREDENTIAL_MAP[key]
    if (!credential) {
      setServerError('No account found with these credentials. Use a demo account below.')
      return
    }
    login(credential.role, credential.user)
  }

  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: '1fr 1fr' }}>

      {/* ── Left: form column ──────────────────────────────────────── */}
      <div className="flex flex-col justify-center px-16 bg-[var(--surface-page)] overflow-y-auto py-10">
        <div style={{ maxWidth: 480, width: '100%', margin: '0 auto' }}>

          {/* Brand */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[var(--scholar-600)] flex items-center justify-center text-white font-bold text-sm">E</div>
            <div className="font-semibold text-[18px] tracking-[-0.01em]">EduEase</div>
          </div>

          <h1 className="font-semibold text-[38px] tracking-[-0.02em] leading-[1.05] mb-2">Welcome back.</h1>
          <p className="text-[var(--ink-2)] text-[15px] mb-8 max-w-[400px]">
            Sign in with a demo account or enter your credentials.
          </p>

          {/* ── Demo cards ──────────────────────────────────────── */}
          <div className="mb-7">
            <div className="flex items-center gap-1.5 mb-3">
              <Zap size={13} className="text-[var(--amber-600)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-3)]">
                Demo accounts — click to fill
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {DEMO_ACCOUNTS.map(acc => {
                const Icon = acc.icon
                const isActive = activeDemo === acc.role
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => fillDemo(acc)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl border transition-all cursor-pointer',
                      isActive
                        ? 'shadow-[0_0_0_2px]'
                        : 'hover:shadow-[var(--shadow-1)] bg-white'
                    )}
                    style={{
                      background: isActive ? acc.bg : '#fff',
                      borderColor: isActive ? acc.accent : 'var(--line-strong)',
                      boxShadow: isActive ? `0 0 0 2px ${acc.accent}` : undefined,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: acc.bg }}
                      >
                        <Icon size={15} style={{ color: acc.accent }} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[13px] font-semibold text-[var(--ink-1)]">{acc.name}</span>
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: acc.bg, color: acc.accent }}
                          >
                            {acc.role}
                          </span>
                        </div>
                        <div className="text-[11px] text-[var(--ink-3)] mb-1">{acc.title}</div>
                        <div className="text-[11px] text-[var(--ink-2)] leading-relaxed">{acc.description}</div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5 flex-shrink-0 mt-0.5">
                        <span className="font-mono text-[10px] text-[var(--ink-3)]">{acc.email}</span>
                        <span className="font-mono text-[10px] text-[var(--ink-3)]">{acc.password}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[var(--line)]" />
            <span className="text-[11px] text-[var(--ink-3)] font-medium">or enter credentials</span>
            <div className="flex-1 h-px bg-[var(--line)]" />
          </div>

          {/* ── Form ─────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Server error */}
            {serverError && (
              <div className="mb-4 flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--rose-50)] border border-[var(--rose-200)]">
                <AlertCircle size={15} className="text-[var(--rose-600)] flex-shrink-0 mt-0.5" />
                <span className="text-[12px] text-[var(--rose-700)] font-medium">{serverError}</span>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[12px] font-semibold text-[var(--ink-1)]">Email or school code</label>
              <input
                {...register('email')}
                placeholder="you@school.edu"
                autoComplete="email"
                onChange={e => {
                  register('email').onChange(e)
                  setActiveDemo(null)
                  setServerError('')
                }}
                className={cn(
                  'h-[38px] px-3 rounded-lg border bg-white text-[14px] text-[var(--ink-1)] outline-none transition-all',
                  errors.email
                    ? 'border-[var(--rose-500)] focus:shadow-[0_0_0_3px_var(--rose-50)]'
                    : 'border-[var(--line-strong)] focus:border-[var(--scholar-600)] focus:shadow-[0_0_0_3px_var(--scholar-50)]'
                )}
              />
              {errors.email && (
                <p className="text-[11px] text-[var(--rose-600)] flex items-center gap-1 font-medium">
                  <AlertCircle size={11} /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-semibold text-[var(--ink-1)]">Password</label>
                <button type="button" className="text-[11px] font-semibold text-[var(--scholar-600)] cursor-pointer">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  onChange={e => {
                    register('password').onChange(e)
                    setActiveDemo(null)
                    setServerError('')
                  }}
                  className={cn(
                    'w-full h-[38px] px-3 pr-10 rounded-lg border bg-white text-[14px] text-[var(--ink-1)] outline-none transition-all',
                    errors.password
                      ? 'border-[var(--rose-500)] focus:shadow-[0_0_0_3px_var(--rose-50)]'
                      : 'border-[var(--line-strong)] focus:border-[var(--scholar-600)] focus:shadow-[0_0_0_3px_var(--scholar-50)]'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-3)] hover:text-[var(--ink-1)] cursor-pointer"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-[var(--rose-600)] flex items-center gap-1 font-medium">
                  <AlertCircle size={11} /> {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 text-[13px] text-[var(--ink-2)] mb-5 cursor-pointer">
              <input type="checkbox" {...register('rememberMe')} className="rounded accent-[var(--scholar-600)]" />
              Keep me signed in on this device
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-[10px] bg-[var(--scholar-600)] text-white text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[var(--scholar-700)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isSubmitting ? 'Signing in…' : <>Sign in <ArrowRight size={16} /></>}
            </button>

            <div className="text-center mt-4 text-[13px] text-[var(--ink-3)]">
              Need help?{' '}
              <button type="button" className="text-[var(--scholar-600)] font-semibold cursor-pointer">
                Contact support
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-4 mt-8 text-[12px] text-[var(--ink-3)]">
            <span>© 2026 EduEase</span>
            <button type="button" className="hover:underline cursor-pointer">Privacy</button>
            <button type="button" className="hover:underline cursor-pointer">Terms</button>
            <span className="text-[var(--mint-600)] font-medium">● All systems normal</span>
          </div>
        </div>
      </div>

      {/* ── Right: art column ──────────────────────────────────────── */}
      <div
        className="flex flex-col justify-between p-16 relative overflow-hidden"
        style={{ background: 'var(--scholar-700)', color: '#fff' }}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.12) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-[0.08em] font-semibold opacity-70 mb-6">
            From a principal who switched last term
          </div>
          <blockquote
            className="text-[34px] leading-[1.2] max-w-[480px]"
            style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            "My Monday morning used to start at 6am. Now it starts at 9, with coffee, because the daily report writes itself."
          </blockquote>
          <div className="flex items-center gap-3.5 mt-7">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-semibold flex-shrink-0"
              style={{ background: 'var(--coral-500)' }}
            >
              RM
            </div>
            <div>
              <div className="font-semibold">Rajesh Mehra</div>
              <div className="text-[12px] opacity-70">Principal · Springfield International, Bengaluru</div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-[0.06em] font-semibold opacity-60 mb-4">
            What each role can access
          </div>
          <div className="flex flex-col gap-2 mb-8">
            {[
              ['School Admin',  'Students · Teachers · Fees · Attendance · Reports · Messages'],
              ['Super Admin',   'All schools · Billing · Licensing · District analytics'],
              ['Teacher',       'My classes · Attendance marking · Grades · Parent chat'],
            ].map(([r, desc]) => (
              <div key={r} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold">{r} — </span>
                  <span className="text-[12px] opacity-70">{desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-8">
            {[['2,400+', 'schools onboarded'], ['94%', 'renewal rate'], ['11h', 'saved per admin/wk']].map(([n, l]) => (
              <div key={l}>
                <div className="font-semibold text-[28px] tracking-[-0.02em]">{n}</div>
                <div className="text-[12px] opacity-70 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
