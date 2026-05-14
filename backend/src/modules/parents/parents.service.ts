import { prisma } from '../../prisma/client'
import { AppError } from '../../shared/errors/AppError'
import { hashPassword } from '../../shared/utils/hash'
import { buildMeta } from '../../shared/utils/pagination'
import { parentsRepository } from './parents.repository'
import type { CreateParentInput, UpdateParentInput, ListParentsInput } from './parents.dto'

export const parentsService = {
  async list(schoolId: string, filters: ListParentsInput) {
    const [parents, total] = await Promise.all([
      parentsRepository.findMany(schoolId, filters),
      parentsRepository.count(schoolId, { search: filters.search }),
    ])
    return { parents, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async getById(id: string, schoolId: string) {
    const parent = await parentsRepository.findById(id, schoolId)
    if (!parent) throw AppError.notFound('Parent')
    return parent
  },

  async create(schoolId: string, data: CreateParentInput) {
    const passwordHash = await hashPassword(data.password)

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
          role: 'PARENT',
          schoolId,
        },
      })

      const parent = await tx.parent.create({
        data: { schoolId, userId: user.id },
      })

      await tx.parentStudent.createMany({
        data: data.childrenIds.map((studentId) => ({
          parentId: parent.id,
          studentId,
        })),
      })

      return parentsRepository.findById(parent.id, schoolId)
    })
  },

  async update(id: string, schoolId: string, data: UpdateParentInput) {
    const parent = await parentsService.getById(id, schoolId)

    if (data.name) {
      await prisma.user.update({
        where: { id: parent.userId },
        data: { name: data.name },
      })
    }

    if (data.childrenIds) {
      await prisma.$transaction([
        prisma.parentStudent.deleteMany({ where: { parentId: id } }),
        prisma.parentStudent.createMany({
          data: data.childrenIds.map((studentId) => ({
            parentId: id,
            studentId,
          })),
        }),
      ])
    }

    return parentsRepository.findById(id, schoolId)
  },

  async delete(id: string, schoolId: string) {
    await parentsService.getById(id, schoolId)
    return parentsRepository.softDelete(id)
  },
}
