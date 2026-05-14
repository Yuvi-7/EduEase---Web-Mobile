import { prisma } from '../../prisma/client'

export const parentsRepository = {
  findMany(schoolId: string, filters: { page: number; limit: number; search?: string }) {
    return prisma.parent.findMany({
      where: {
        schoolId,
        deletedAt: null,
        ...(filters.search
          ? { user: { name: { contains: filters.search, mode: 'insensitive' as const } } }
          : {}),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        children: {
          include: {
            student: {
              include: { user: { select: { name: true } } },
              select: { id: true, grade: true, user: true },
            },
          },
        },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { user: { name: 'asc' } },
    })
  },

  count(schoolId: string, filters: { search?: string }) {
    return prisma.parent.count({
      where: {
        schoolId,
        deletedAt: null,
        ...(filters.search
          ? { user: { name: { contains: filters.search, mode: 'insensitive' as const } } }
          : {}),
      },
    })
  },

  findById(id: string, schoolId: string) {
    return prisma.parent.findFirst({
      where: { id, schoolId, deletedAt: null },
      include: {
        user: { select: { id: true, name: true, email: true } },
        children: {
          include: {
            student: {
              include: { user: { select: { name: true, email: true } } },
            },
          },
        },
      },
    })
  },

  softDelete(id: string) {
    return prisma.parent.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  },
}
