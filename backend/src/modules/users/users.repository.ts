import { prisma } from '../../prisma/client'
import type { Role } from '@prisma/client'

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  schoolId: true,
  createdAt: true,
  updatedAt: true,
  school: { select: { id: true, name: true, code: true } },
}

export const usersRepository = {
  findMany(schoolId: string | null, filters: { page: number; limit: number; role?: Role; search?: string }) {
    const where = {
      deletedAt: null,
      ...(schoolId ? { schoolId } : {}),
      ...(filters.role ? { role: filters.role } : {}),
      ...(filters.search
        ? { name: { contains: filters.search, mode: 'insensitive' as const } }
        : {}),
    }

    return prisma.user.findMany({
      where,
      select: USER_SELECT,
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { name: 'asc' },
    })
  },

  count(schoolId: string | null, filters: { role?: Role; search?: string }) {
    return prisma.user.count({
      where: {
        deletedAt: null,
        ...(schoolId ? { schoolId } : {}),
        ...(filters.role ? { role: filters.role } : {}),
        ...(filters.search
          ? { name: { contains: filters.search, mode: 'insensitive' as const } }
          : {}),
      },
    })
  },

  findById(id: string) {
    return prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: USER_SELECT,
    })
  },

  create(data: {
    name: string
    email: string
    passwordHash: string
    role: Role
    schoolId?: string
  }) {
    return prisma.user.create({
      data,
      select: USER_SELECT,
    })
  },

  update(id: string, data: { name?: string; email?: string; role?: Role }) {
    return prisma.user.update({
      where: { id },
      data,
      select: USER_SELECT,
    })
  },

  softDelete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  },
}
