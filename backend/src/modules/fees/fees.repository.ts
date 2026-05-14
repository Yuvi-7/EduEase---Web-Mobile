import { prisma } from '../../prisma/client'
import type { FeeStatus } from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'

export const feesRepository = {
  findMany(schoolId: string, filters: { page: number; limit: number; studentId?: string; status?: FeeStatus }) {
    return prisma.fee.findMany({
      where: {
        schoolId,
        ...(filters.studentId ? { studentId: filters.studentId } : {}),
        ...(filters.status ? { status: filters.status } : {}),
      },
      include: {
        student: { include: { user: { select: { name: true } } } },
      },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { dueDate: 'desc' },
    })
  },

  count(schoolId: string, filters: { studentId?: string; status?: FeeStatus }) {
    return prisma.fee.count({
      where: {
        schoolId,
        ...(filters.studentId ? { studentId: filters.studentId } : {}),
        ...(filters.status ? { status: filters.status } : {}),
      },
    })
  },

  findById(id: string, schoolId: string) {
    return prisma.fee.findFirst({
      where: { id, schoolId },
      include: { student: { include: { user: { select: { name: true } } } } },
    })
  },

  create(data: { schoolId: string; studentId: string; amount: Decimal; dueDate: Date; label?: string }) {
    return prisma.fee.create({ data })
  },

  update(id: string, data: { amount?: Decimal; dueDate?: Date; paidDate?: Date; status?: FeeStatus; label?: string }) {
    return prisma.fee.update({ where: { id }, data })
  },
}
