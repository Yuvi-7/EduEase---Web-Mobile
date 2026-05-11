import { Search, Bell, HelpCircle, Plus, Filter, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopBarProps {
  searchPlaceholder?: string
  onNew?: () => void
  termLabel?: string
  onLogout?: () => void
}

export function TopBar({
  searchPlaceholder = 'Search students, teachers, classes…',
  onNew,
  termLabel = 'Term 2 · 2026',
  onLogout,
}: TopBarProps) {
  return (
    <header className="flex items-center gap-4 h-[60px] px-7 border-b border-[var(--line)] bg-[var(--surface-page)] flex-shrink-0">
      <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white border border-[var(--line-strong)] text-[var(--ink-3)] text-[13px] flex-1 max-w-[480px] cursor-pointer hover:border-[var(--scholar-600)] transition-colors">
        <Search size={16} className="flex-shrink-0" />
        <span className="flex-1">{searchPlaceholder}</span>
        <kbd className="ml-auto font-mono text-[10px] bg-[var(--surface-sunken)] px-1.5 py-0.5 rounded text-[var(--ink-2)]">⌘K</kbd>
      </div>

      <div className="flex-1" />

      <button className={cn(
        'inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] text-[13px] font-medium',
        'bg-white border border-[var(--line-strong)] text-[var(--ink-1)]',
        'hover:bg-[var(--surface-sunken)] transition-colors cursor-pointer'
      )}>
        <Filter size={14} />
        {termLabel}
      </button>

      <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] hover:text-[var(--ink-1)] transition-colors cursor-pointer">
        <HelpCircle size={18} />
      </button>

      <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] hover:text-[var(--ink-1)] transition-colors cursor-pointer">
        <Bell size={18} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--coral-500)] rounded-full border-2 border-[var(--surface-page)]" />
      </button>

      <button
        onClick={onNew}
        className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] active:scale-[0.98] transition-all cursor-pointer"
      >
        <Plus size={14} />
        New
      </button>

      {onLogout && (
        <button
          onClick={onLogout}
          title="Switch account"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink-2)] hover:bg-[var(--surface-sunken)] hover:text-[var(--rose-600)] transition-colors cursor-pointer"
        >
          <LogOut size={16} />
        </button>
      )}
    </header>
  )
}
