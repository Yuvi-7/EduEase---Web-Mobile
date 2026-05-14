import { z } from 'zod'

export const createStudentDto = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  password: z.string().min(6),
  grade: z.string().min(1).max(10).trim(),
  guardian: z.string().min(2).max(100).trim().optional(),
})

export const updateStudentDto = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  grade: z.string().min(1).max(10).trim().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
})

export const listStudentsDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  grade: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  search: z.string().max(100).trim().optional(),
})

export type CreateStudentInput = z.infer<typeof createStudentDto>
export type UpdateStudentInput = z.infer<typeof updateStudentDto>
export type ListStudentsInput = z.infer<typeof listStudentsDto>
