import { prisma } from '../../prisma/client'
import { AppError } from '../../shared/errors/AppError'
import { hashPassword } from '../../shared/utils/hash'
import { buildMeta } from '../../shared/utils/pagination'
import { teachersRepository } from './teachers.repository'
import type { CreateTeacherInput, UpdateTeacherInput, ListTeachersInput } from './teachers.dto'
import type { TeacherStatus } from '@prisma/client'

export const teachersService = {
  async list(schoolId: string, filters: ListTeachersInput) {
    const [teachers, total] = await Promise.all([
      teachersRepository.findMany(schoolId, {
        ...filters,
        status: filters.status as TeacherStatus | undefined,
      }),
      teachersRepository.count(schoolId, {
        status: filters.status as TeacherStatus | undefined,
        search: filters.search,
      }),
    ])
    return { teachers, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async getById(id: string, schoolId: string) {
    const teacher = await teachersRepository.findById(id, schoolId)
    if (!teacher) throw AppError.notFound('Teacher')
    return teacher
  },

  async create(schoolId: string, data: CreateTeacherInput) {
    const passwordHash = await hashPassword(data.password)

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
          role: 'TEACHER',
          schoolId,
        },
      })

      return tx.teacher.create({
        data: {
          schoolId,
          userId: user.id,
          subject: data.subject,
          load: data.load,
        },
        include: { user: { select: { id: true, name: true, email: true } } },
      })
    })
  },

  async update(id: string, schoolId: string, data: UpdateTeacherInput) {
    const teacher = await teachersService.getById(id, schoolId)

    if (data.name) {
      await prisma.user.update({
        where: { id: teacher.userId },
        data: { name: data.name },
      })
    }

    return teachersRepository.update(id, {
      subject: data.subject,
      load: data.load,
      status: data.status as TeacherStatus | undefined,
    })
  },

  async delete(id: string, schoolId: string) {
    await teachersService.getById(id, schoolId)
    return teachersRepository.softDelete(id)
  },
}
