import { z } from 'zod'

export const createTeacherDto = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  password: z.string().min(6),
  subject: z.string().min(1).max(100).trim(),
  load: z.number().int().min(0).max(50).default(0),
})

export const updateTeacherDto = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  subject: z.string().min(1).max(100).trim().optional(),
  load: z.number().int().min(0).max(50).optional(),
  status: z.enum(['ACTIVE', 'ON_LEAVE']).optional(),
})

export const listTeachersDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['ACTIVE', 'ON_LEAVE']).optional(),
  search: z.string().max(100).trim().optional(),
})

export type CreateTeacherInput = z.infer<typeof createTeacherDto>
export type UpdateTeacherInput = z.infer<typeof updateTeacherDto>
export type ListTeachersInput = z.infer<typeof listTeachersDto>
