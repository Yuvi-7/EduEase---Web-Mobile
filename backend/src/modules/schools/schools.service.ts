import { AppError } from '../../shared/errors/AppError'
import { buildMeta } from '../../shared/utils/pagination'
import { schoolsRepository } from './schools.repository'
import type { CreateSchoolInput, UpdateSchoolInput, ListSchoolsInput } from './schools.dto'
import type { SchoolPlan } from '@prisma/client'

export const schoolsService = {
  async list(filters: ListSchoolsInput) {
    const [schools, total] = await Promise.all([
      schoolsRepository.findMany(filters),
      schoolsRepository.count({ search: filters.search }),
    ])
    return { schools, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async getById(id: string) {
    const school = await schoolsRepository.findById(id)
    if (!school) throw AppError.notFound('School')
    return school
  },

  async create(data: CreateSchoolInput) {
    return schoolsRepository.create({
      ...data,
      plan: data.plan as SchoolPlan,
    })
  },

  async update(id: string, data: UpdateSchoolInput) {
    await schoolsService.getById(id)
    return schoolsRepository.update(id, {
      ...data,
      plan: data.plan as SchoolPlan | undefined,
    })
  },

  async delete(id: string) {
    await schoolsService.getById(id)
    return schoolsRepository.softDelete(id)
  },
}
