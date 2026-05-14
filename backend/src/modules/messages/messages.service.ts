import { buildMeta } from '../../shared/utils/pagination'
import { messagesRepository } from './messages.repository'
import type { CreateMessageInput, ListMessagesInput } from './messages.dto'

export const messagesService = {
  async list(schoolId: string, userId: string, filters: ListMessagesInput) {
    const [messages, total] = await Promise.all([
      messagesRepository.findMany(schoolId, userId, filters),
      messagesRepository.count(schoolId, userId),
    ])
    return { messages, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async create(schoolId: string, fromId: string, data: CreateMessageInput) {
    return messagesRepository.create({
      schoolId,
      fromId,
      toId: data.toId,
      body: data.body,
    })
  },

  async markAsRead(id: string) {
    return messagesRepository.markAsRead(id)
  },
}
