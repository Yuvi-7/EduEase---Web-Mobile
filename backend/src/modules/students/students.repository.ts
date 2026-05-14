import { prisma } from '../../prisma/client'
import type { StudentStatus } from '@prisma/client'

export const studentsRepository = {
  findMany(schoolId: string, filters: { page: number; limit: number; grade?: string; status?: StudentStatus; search?: string }) {
    return prisma.student.findMany({
      where: {
        schoolId,
        deletedAt: null,
        ...(filters.grade ? { grade: filters.grade } : {}),
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.search
          ? { user: { name: { contains: filters.search, mode: 'insensitive' as const } } }
          : {}),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        parents: {
          include: {
            parent: { include: { user: { select: { name: true, email: true } } } },
          },
        },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { user: { name: 'asc' } },
    })
  },

  count(schoolId: string, filters: { grade?: string; status?: StudentStatus; search?: string }) {
    return prisma.student.count({
      where: {
        schoolId,
        deletedAt: null,
        ...(filters.grade ? { grade: filters.grade } : {}),
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.search
          ? { user: { name: { contains: filters.search, mode: 'insensitive' as const } } }
          : {}),
      },
    })
  },

  findById(id: string, schoolId: string) {
    return prisma.student.findFirst({
      where: { id, schoolId, deletedAt: null },
      include: {
        user: { select: { id: true, name: true, email: true } },
        parents: {
          include: {
            parent: { include: { user: { select: { name: true, email: true } } } },
          },
        },
        fees: { orderBy: { dueDate: 'desc' }, take: 10 },
      },
    })
  },

  create(data: { schoolId: string; userId: string; grade: string }) {
    return prisma.student.create({
      data,
      include: { user: { select: { id: true, name: true, email: true } } },
    })
  },

  update(id: string, data: { grade?: string; status?: StudentStatus }) {
    return prisma.student.update({
      where: { id },
      data,
      include: { user: { select: { id: true, name: true, email: true } } },
    })
  },

  softDelete(id: string) {
    return prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  },
}
