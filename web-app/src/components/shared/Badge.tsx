import { cn } from '@/lib/utils'

type BadgeVariant = 'mint' | 'amber' | 'rose' | 'scholar' | 'coral' | 'neutral'

const variantStyles: Record<BadgeVariant, string> = {
  mint:    'bg-[var(--mint-50)]   text-[var(--mint-700)]',
  amber:   'bg-[var(--amber-50)]  text-[var(--amber-700)]',
  rose:    'bg-[var(--rose-50)]   text-[var(--rose-700)]',
  scholar: 'bg-[var(--scholar-50)] text-[var(--scholar-800)]',
  coral:   'bg-[var(--coral-50)]  text-[var(--coral-700)]',
  neutral: 'bg-[var(--surface-sunken)] text-[var(--ink-2)]',
}

interface BadgeProps {
  variant: BadgeVariant
  dot?: boolean
  children: React.ReactNode
  className?: string
}

export function Badge({ variant, dot, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-[22px] px-[9px] rounded-full text-[11px] font-semibold',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: `var(--${variant}-500)` }}
        />
      )}
      {children}
    </span>
  )
}
