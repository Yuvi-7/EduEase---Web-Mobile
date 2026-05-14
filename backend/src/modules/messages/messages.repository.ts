import { prisma } from '../../prisma/client'

export const messagesRepository = {
  findMany(schoolId: string, userId: string, filters: { page: number; limit: number }) {
    return prisma.message.findMany({
      where: {
        schoolId,
        OR: [{ fromId: userId }, { toId: userId }, { toId: null }],
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { createdAt: 'desc' },
    })
  },

  count(schoolId: string, userId: string) {
    return prisma.message.count({
      where: {
        schoolId,
        OR: [{ fromId: userId }, { toId: userId }, { toId: null }],
      },
    })
  },

  create(data: { schoolId: string; fromId: string; toId?: string; body: string }) {
    return prisma.message.create({ data })
  },

  markAsRead(id: string) {
    return prisma.message.update({
      where: { id },
      data: { unread: false },
    })
  },
}
