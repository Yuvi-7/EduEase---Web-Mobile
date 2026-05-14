import { AppError } from '../../shared/errors/AppError'
import { buildMeta } from '../../shared/utils/pagination'
import { classesRepository } from './classes.repository'
import type { CreateClassInput, UpdateClassInput, ListClassesInput } from './classes.dto'

export const classesService = {
  async list(schoolId: string, filters: ListClassesInput) {
    const [classes, total] = await Promise.all([
      classesRepository.findMany(schoolId, filters),
      classesRepository.count(schoolId, { grade: filters.grade }),
    ])
    return { classes, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async getById(id: string, schoolId: string) {
    const cls = await classesRepository.findById(id, schoolId)
    if (!cls) throw AppError.notFound('Class')
    return cls
  },

  async create(schoolId: string, data: CreateClassInput) {
    return classesRepository.create({ ...data, schoolId })
  },

  async update(id: string, schoolId: string, data: UpdateClassInput) {
    await classesService.getById(id, schoolId)
    return classesRepository.update(id, data)
  },

  async delete(id: string, schoolId: string) {
    await classesService.getById(id, schoolId)
    return classesRepository.softDelete(id)
  },
}
