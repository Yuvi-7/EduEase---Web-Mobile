import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn('shimmer rounded', className)} style={style} />
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="bg-white border border-[var(--line)] rounded-xl overflow-hidden shadow-[var(--shadow-1)]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--line)]">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--line)] bg-[var(--surface-card)]">
            {[36, 120, 100, 80, 120, 80, 80, 40].map((w, i) => (
              <th key={i} className="px-4 py-2.5 text-left">
                <Skeleton className="h-3" style={{ width: w }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b border-[var(--line)] last:border-0">
              <td className="px-4 py-3.5"><Skeleton className="h-4 w-4" /></td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </td>
              <td className="px-4 py-3.5"><Skeleton className="h-3 w-24" /></td>
              <td className="px-4 py-3.5"><Skeleton className="h-3 w-16" /></td>
              <td className="px-4 py-3.5"><Skeleton className="h-3 w-20" /></td>
              <td className="px-4 py-3.5"><Skeleton className="h-5 w-14 rounded-full" /></td>
              <td className="px-4 py-3.5 text-right"><Skeleton className="h-4 w-10 ml-auto" /></td>
              <td className="px-4 py-3.5"><Skeleton className="h-4 w-4" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
