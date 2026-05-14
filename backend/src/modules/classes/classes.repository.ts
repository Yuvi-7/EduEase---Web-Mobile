import { prisma } from '../../prisma/client'

export const classesRepository = {
  findMany(schoolId: string, filters: { page: number; limit: number; grade?: number }) {
    return prisma.classSection.findMany({
      where: {
        schoolId,
        deletedAt: null,
        ...(filters.grade ? { grade: filters.grade } : {}),
      },
      include: {
        teacher: { include: { user: { select: { name: true } } } },
        _count: { select: { attendance: true } },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: [{ grade: 'asc' }, { section: 'asc' }],
    })
  },

  count(schoolId: string, filters: { grade?: number }) {
    return prisma.classSection.count({
      where: { schoolId, deletedAt: null, ...(filters.grade ? { grade: filters.grade } : {}) },
    })
  },

  findById(id: string, schoolId: string) {
    return prisma.classSection.findFirst({
      where: { id, schoolId, deletedAt: null },
      include: {
        teacher: { include: { user: { select: { name: true, email: true } } } },
        timetable: { orderBy: [{ day: 'asc' }, { slot: 'asc' }] },
      },
    })
  },

  create(data: { schoolId: string; grade: number; section: string; room?: string; teacherId?: string }) {
    return prisma.classSection.create({ data })
  },

  update(id: string, data: { grade?: number; section?: string; room?: string; teacherId?: string }) {
    return prisma.classSection.update({ where: { id }, data })
  },

  softDelete(id: string) {
    return prisma.classSection.update({ where: { id }, data: { deletedAt: new Date() } })
  },
}
