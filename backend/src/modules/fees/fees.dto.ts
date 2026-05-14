import { z } from 'zod'

export const createFeeDto = z.object({
  studentId: z.string().uuid(),
  amount: z.number().positive(),
  dueDate: z.string().date(),
  label: z.string().max(200).trim().optional(),
})

export const updateFeeDto = z.object({
  amount: z.number().positive().optional(),
  dueDate: z.string().date().optional(),
  paidDate: z.string().date().optional(),
  status: z.enum(['PAID', 'DUE', 'OVERDUE', 'PARTIAL']).optional(),
  label: z.string().max(200).trim().optional(),
})

export const listFeesDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  studentId: z.string().uuid().optional(),
  status: z.enum(['PAID', 'DUE', 'OVERDUE', 'PARTIAL']).optional(),
})

export type CreateFeeInput = z.infer<typeof createFeeDto>
export type UpdateFeeInput = z.infer<typeof updateFeeDto>
export type ListFeesInput = z.infer<typeof listFeesDto>
