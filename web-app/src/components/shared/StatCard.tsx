import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  eye: string
  value: string | number
  suffix?: string
  delta?: string
  deltaDir?: 'up' | 'down'
  foot?: string
  spark?: number[]
  loading?: boolean
}

export function StatCard({ eye, value, suffix, delta, deltaDir = 'up', foot, spark, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="bg-white border border-[var(--line)] rounded-xl p-5 shadow-[var(--shadow-1)]">
        <div className="shimmer h-3 w-24 rounded mb-3" />
        <div className="shimmer h-8 w-32 rounded mb-3" />
        <div className="shimmer h-3 w-40 rounded" />
      </div>
    )
  }

  return (
    <div className="bg-white border border-[var(--line)] rounded-xl p-5 shadow-[var(--shadow-1)]">
      <div className="text-[11px] uppercase tracking-[0.06em] text-[var(--ink-3)] font-semibold">{eye}</div>
      <div className="font-semibold text-[32px] leading-none mt-2 tracking-[-0.02em] tabnum">
        {value}
        {suffix && <small className="text-lg text-[var(--ink-2)] font-semibold">{suffix}</small>}
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-[var(--ink-2)]">{foot}</div>
        {spark ? (
          <Sparkline data={spark} />
        ) : delta ? (
          <div className={cn('text-xs font-semibold flex items-center gap-1', deltaDir === 'up' ? 'text-[var(--mint-700)]' : 'text-[var(--rose-700)]')}>
            {deltaDir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {delta}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-0.5 h-6 w-[70px]">
      {data.map((v, i) => (
        <span
          key={i}
          className={cn('flex-1 rounded-[1px]', i === data.length - 1 ? 'bg-[var(--scholar-600)]' : 'bg-[var(--scholar-200)]')}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  )
}
