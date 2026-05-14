import { prisma } from '../../prisma/client'
import type { TeacherStatus } from '@prisma/client'

export const teachersRepository = {
  findMany(schoolId: string, filters: { page: number; limit: number; status?: TeacherStatus; search?: string }) {
    return prisma.teacher.findMany({
      where: {
        schoolId,
        deletedAt: null,
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.search
          ? { user: { name: { contains: filters.search, mode: 'insensitive' as const } } }
          : {}),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        classes: { select: { id: true, grade: true, section: true } },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { user: { name: 'asc' } },
    })
  },

  count(schoolId: string, filters: { status?: TeacherStatus; search?: string }) {
    return prisma.teacher.count({
      where: {
        schoolId,
        deletedAt: null,
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.search
          ? { user: { name: { contains: filters.search, mode: 'insensitive' as const } } }
          : {}),
      },
    })
  },

  findById(id: string, schoolId: string) {
    return prisma.teacher.findFirst({
      where: { id, schoolId, deletedAt: null },
      include: {
        user: { select: { id: true, name: true, email: true } },
        classes: true,
        timetable: { orderBy: [{ day: 'asc' }, { slot: 'asc' }] },
      },
    })
  },

  create(data: { schoolId: string; userId: string; subject: string; load: number }) {
    return prisma.teacher.create({
      data,
      include: { user: { select: { id: true, name: true, email: true } } },
    })
  },

  update(id: string, data: { subject?: string; load?: number; status?: TeacherStatus }) {
    return prisma.teacher.update({
      where: { id },
      data,
      include: { user: { select: { id: true, name: true, email: true } } },
    })
  },

  softDelete(id: string) {
    return prisma.teacher.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  },
}
