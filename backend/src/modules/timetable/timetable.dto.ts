import { z } from 'zod'

export const createTimetableDto = z.object({
  classId: z.string().uuid(),
  teacherId: z.string().uuid(),
  day: z.number().int().min(0).max(4),
  slot: z.number().int().min(1).max(10),
  subject: z.string().min(1).max(100).trim(),
  room: z.string().max(20).trim().optional(),
})

export const updateTimetableDto = createTimetableDto.partial()

export const listTimetableDto = z.object({
  classId: z.string().uuid().optional(),
  teacherId: z.string().uuid().optional(),
})

export type CreateTimetableInput = z.infer<typeof createTimetableDto>
export type UpdateTimetableInput = z.infer<typeof updateTimetableDto>
export type ListTimetableInput = z.infer<typeof listTimetableDto>
