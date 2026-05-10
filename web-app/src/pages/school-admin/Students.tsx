import { useState } from 'react'
import { Upload, Plus, Filter } from 'lucide-react'
import { StudentsTable } from '@/components/students/StudentsTable'
import { StudentDrawer } from '@/components/students/StudentDrawer'
import type { Student } from '@/types'
import { cn } from '@/lib/utils'

const GRADES = ['all', '4', '5', '6', '7', '8', '9', '10']

export function Students() {
  const [filter, setFilter] = useState('all')
  const [student, setStudent] = useState<Student | null>(null)

  return (
    <>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-semibold text-[32px] tracking-[-0.02em] leading-[1.1]">Students</h1>
          <div className="text-[var(--ink-2)] text-[14px] mt-1.5">1,256 active · 42 classes · Click a row to see profile</div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-white border border-[var(--line-strong)] text-[13px] font-medium text-[var(--ink-1)] hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors">
            <Upload size={14} /> Import roster
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[10px] bg-[var(--scholar-600)] text-white text-[13px] font-medium hover:bg-[var(--scholar-700)] cursor-pointer transition-colors">
            <Plus size={14} /> Add student
          </button>
        </div>
      </div>

      {/* Grade chips */}
      <div className="flex gap-2 flex-wrap mb-4">
        {GRADES.map(g => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={cn(
              'inline-flex items-center gap-1.5 h-[30px] px-3 rounded-full text-[12px] font-medium border transition-all cursor-pointer',
              filter === g
                ? 'bg-[var(--ink-1)] text-white border-[var(--ink-1)]'
                : 'bg-white text-[var(--ink-1)] border-[var(--line-strong)] hover:bg-[var(--surface-sunken)]'
            )}
          >
            {g === 'all' ? 'All grades' : `Grade ${g}`}
          </button>
        ))}
        <div className="flex-1" />
        <button className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-full text-[12px] font-medium border bg-white text-[var(--ink-1)] border-[var(--line-strong)] hover:bg-[var(--surface-sunken)] cursor-pointer">
          <Filter size={14} /> More filters
        </button>
      </div>

      <StudentsTable onOpen={s => setStudent(s)} filter={filter} />
      <StudentDrawer student={student} open={!!student} onClose={() => setStudent(null)} />
    </>
  )
}
