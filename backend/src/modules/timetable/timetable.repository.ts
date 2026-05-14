import { prisma } from '../../prisma/client'

export const timetableRepository = {
  findMany(schoolId: string, filters: { classId?: string; teacherId?: string }) {
    return prisma.timetableEntry.findMany({
      where: {
        schoolId,
        ...(filters.classId ? { classId: filters.classId } : {}),
        ...(filters.teacherId ? { teacherId: filters.teacherId } : {}),
      },
      include: {
        class: { select: { grade: true, section: true } },
        teacher: { include: { user: { select: { name: true } } } },
      },
      orderBy: [{ day: 'asc' }, { slot: 'asc' }],
    })
  },

  findById(id: string, schoolId: string) {
    return prisma.timetableEntry.findFirst({
      where: { id, schoolId },
      include: {
        class: { select: { grade: true, section: true } },
        teacher: { include: { user: { select: { name: true } } } },
      },
    })
  },

  create(data: {
    schoolId: string
    classId: string
    teacherId: string
    day: number
    slot: number
    subject: string
    room?: string
  }) {
    return prisma.timetableEntry.create({ data })
  },

  update(id: string, data: Partial<{
    classId: string
    teacherId: string
    day: number
    slot: number
    subject: string
    room: string
  }>) {
    return prisma.timetableEntry.update({ where: { id }, data })
  },

  delete(id: string) {
    return prisma.timetableEntry.delete({ where: { id } })
  },
}
