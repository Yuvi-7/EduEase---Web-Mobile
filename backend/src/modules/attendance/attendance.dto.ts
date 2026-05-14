import { z } from 'zod'

const attendanceEntry = z.object({
  studentId: z.string().uuid(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
})

export const bulkAttendanceDto = z.object({
  classId: z.string().uuid(),
  date: z.string().date(),
  entries: z.array(attendanceEntry).min(1),
})

export const updateAttendanceDto = z.object({
  status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
})

export const listAttendanceDto = z.object({
  classId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
  date: z.string().date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
})

export type BulkAttendanceInput = z.infer<typeof bulkAttendanceDto>
export type UpdateAttendanceInput = z.infer<typeof updateAttendanceDto>
export type ListAttendanceInput = z.infer<typeof listAttendanceDto>
