import { z } from 'zod'

export const createSchoolDto = z.object({
  code: z.string().min(3).max(20).trim().toUpperCase(),
  name: z.string().min(2).max(200).trim(),
  city: z.string().min(2).max(100).trim(),
  plan: z.enum(['STARTER', 'GROWTH', 'SCALE']).default('STARTER'),
})

export const updateSchoolDto = createSchoolDto.partial()

export const listSchoolsDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().max(100).trim().optional(),
})

export type CreateSchoolInput = z.infer<typeof createSchoolDto>
export type UpdateSchoolInput = z.infer<typeof updateSchoolDto>
export type ListSchoolsInput = z.infer<typeof listSchoolsDto>
