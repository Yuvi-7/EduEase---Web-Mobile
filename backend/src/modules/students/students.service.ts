import { prisma } from '../../prisma/client'
import { AppError } from '../../shared/errors/AppError'
import { hashPassword } from '../../shared/utils/hash'
import { buildMeta } from '../../shared/utils/pagination'
import { studentsRepository } from './students.repository'
import type { CreateStudentInput, UpdateStudentInput, ListStudentsInput } from './students.dto'
import type { StudentStatus } from '@prisma/client'

export const studentsService = {
  async list(schoolId: string, filters: ListStudentsInput) {
    const [students, total] = await Promise.all([
      studentsRepository.findMany(schoolId, {
        ...filters,
        status: filters.status as StudentStatus | undefined,
      }),
      studentsRepository.count(schoolId, {
        grade: filters.grade,
        status: filters.status as StudentStatus | undefined,
        search: filters.search,
      }),
    ])
    return { students, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async getById(id: string, schoolId: string) {
    const student = await studentsRepository.findById(id, schoolId)
    if (!student) throw AppError.notFound('Student')
    return student
  },

  async create(schoolId: string, data: CreateStudentInput) {
    const passwordHash = await hashPassword(data.password)

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
          role: 'STUDENT',
          schoolId,
        },
      })

      return tx.student.create({
        data: {
          schoolId,
          userId: user.id,
          grade: data.grade,
        },
        include: { user: { select: { id: true, name: true, email: true } } },
      })
    })
  },

  async update(id: string, schoolId: string, data: UpdateStudentInput) {
    await studentsService.getById(id, schoolId)

    if (data.name) {
      const student = await studentsRepository.findById(id, schoolId)
      if (student) {
        await prisma.user.update({
          where: { id: student.userId },
          data: { name: data.name },
        })
      }
    }

    return studentsRepository.update(id, {
      grade: data.grade,
      status: data.status as StudentStatus | undefined,
    })
  },

  async delete(id: string, schoolId: string) {
    await studentsService.getById(id, schoolId)
    return studentsRepository.softDelete(id)
  },
}
