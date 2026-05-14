import { prisma } from '../../prisma/client'
import type { AttendanceStatus } from '@prisma/client'

export const attendanceRepository = {
  findMany(schoolId: string, filters: { page: number; limit: number; classId?: string; studentId?: string; date?: string }) {
    return prisma.attendance.findMany({
      where: {
        schoolId,
        ...(filters.classId ? { classId: filters.classId } : {}),
        ...(filters.studentId ? { studentId: filters.studentId } : {}),
        ...(filters.date ? { date: new Date(filters.date) } : {}),
      },
      include: {
        student: { include: { user: { select: { name: true } } } },
        class: { select: { grade: true, section: true } },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { date: 'desc' },
    })
  },

  count(schoolId: string, filters: { classId?: string; studentId?: string; date?: string }) {
    return prisma.attendance.count({
      where: {
        schoolId,
        ...(filters.classId ? { classId: filters.classId } : {}),
        ...(filters.studentId ? { studentId: filters.studentId } : {}),
        ...(filters.date ? { date: new Date(filters.date) } : {}),
      },
    })
  },

  bulkUpsert(schoolId: string, classId: string, date: Date, entries: { studentId: string; status: AttendanceStatus }[]) {
    return prisma.$transaction(
      entries.map((entry) =>
        prisma.attendance.upsert({
          where: {
            classId_studentId_date: {
              classId,
              studentId: entry.studentId,
              date,
            },
          },
          create: {
            schoolId,
            classId,
            studentId: entry.studentId,
            date,
            status: entry.status,
          },
          update: { status: entry.status },
        }),
      ),
    )
  },

  update(id: string, status: AttendanceStatus) {
    return prisma.attendance.update({ where: { id }, data: { status } })
  },
}
