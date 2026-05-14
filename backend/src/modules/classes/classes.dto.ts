import { z } from 'zod'

export const createClassDto = z.object({
  grade: z.number().int().min(1).max(12),
  section: z.string().min(1).max(5).trim().toUpperCase(),
  room: z.string().max(20).trim().optional(),
  teacherId: z.string().uuid().optional(),
})

export const updateClassDto = createClassDto.partial()

export const listClassesDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  grade: z.coerce.number().int().optional(),
})

export type CreateClassInput = z.infer<typeof createClassDto>
export type UpdateClassInput = z.infer<typeof updateClassDto>
export type ListClassesInput = z.infer<typeof listClassesDto>
