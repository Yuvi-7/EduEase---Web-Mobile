import { z } from 'zod'

export const createMessageDto = z.object({
  toId: z.string().uuid().optional(),
  body: z.string().min(1).max(5000).trim(),
})

export const listMessagesDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export type CreateMessageInput = z.infer<typeof createMessageDto>
export type ListMessagesInput = z.infer<typeof listMessagesDto>
