import { avatarColor, initials, cn } from '@/lib/utils'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const sizeMap = {
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-[13px]',
  lg: 'w-12 h-12 text-base',
}

export function Avatar({ name, size = 'md', color, className }: AvatarProps) {
  const bg = color ?? avatarColor(name)
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold text-white flex-shrink-0',
        sizeMap[size],
        className
      )}
      style={{ background: bg }}
    >
      {initials(name)}
    </span>
  )
}
