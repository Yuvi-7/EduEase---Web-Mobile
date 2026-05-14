import { prisma } from '../../prisma/client'
import type { SchoolPlan } from '@prisma/client'

export const schoolsRepository = {
  findMany(filters: { page: number; limit: number; search?: string }) {
    return prisma.school.findMany({
      where: {
        deletedAt: null,
        ...(filters.search
          ? { name: { contains: filters.search, mode: 'insensitive' as const } }
          : {}),
      },
      include: {
        _count: { select: { students: true, teachers: true, users: true } },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { name: 'asc' },
    })
  },

  count(filters: { search?: string }) {
    return prisma.school.count({
      where: {
        deletedAt: null,
        ...(filters.search
          ? { name: { contains: filters.search, mode: 'insensitive' as const } }
          : {}),
      },
    })
  },

  findById(id: string) {
    return prisma.school.findFirst({
      where: { id, deletedAt: null },
      include: {
        _count: { select: { students: true, teachers: true, users: true, classes: true } },
      },
    })
  },

  create(data: { code: string; name: string; city: string; plan: SchoolPlan }) {
    return prisma.school.create({ data })
  },

  update(id: string, data: { code?: string; name?: string; city?: string; plan?: SchoolPlan }) {
    return prisma.school.update({ where: { id }, data })
  },

  softDelete(id: string) {
    return prisma.school.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  },
}
