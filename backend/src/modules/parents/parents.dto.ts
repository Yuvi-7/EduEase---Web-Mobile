import { z } from 'zod'

export const createParentDto = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  password: z.string().min(6),
  childrenIds: z.array(z.string().uuid()).min(1),
})

export const updateParentDto = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  childrenIds: z.array(z.string().uuid()).optional(),
})

export const listParentsDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().max(100).trim().optional(),
})

export type CreateParentInput = z.infer<typeof createParentDto>
export type UpdateParentInput = z.infer<typeof updateParentDto>
export type ListParentsInput = z.infer<typeof listParentsDto>
