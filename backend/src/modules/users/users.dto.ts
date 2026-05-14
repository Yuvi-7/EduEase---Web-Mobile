import { z } from 'zod'

export const createUserDto = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['SUPER_ADMIN', 'SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT']),
  schoolId: z.string().uuid().optional(),
})

export const updateUserDto = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  email: z.string().email().optional(),
  role: z.enum(['SUPER_ADMIN', 'SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT']).optional(),
})

export const listUsersDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  role: z.enum(['SUPER_ADMIN', 'SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT']).optional(),
  search: z.string().max(100).trim().optional(),
})

export type CreateUserInput = z.infer<typeof createUserDto>
export type UpdateUserInput = z.infer<typeof updateUserDto>
export type ListUsersInput = z.infer<typeof listUsersDto>
