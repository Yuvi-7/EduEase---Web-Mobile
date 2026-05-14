import { AppError } from '../../shared/errors/AppError'
import { timetableRepository } from './timetable.repository'
import type { CreateTimetableInput, UpdateTimetableInput, ListTimetableInput } from './timetable.dto'

export const timetableService = {
  async list(schoolId: string, filters: ListTimetableInput) {
    return timetableRepository.findMany(schoolId, filters)
  },

  async getById(id: string, schoolId: string) {
    const entry = await timetableRepository.findById(id, schoolId)
    if (!entry) throw AppError.notFound('Timetable entry')
    return entry
  },

  async create(schoolId: string, data: CreateTimetableInput) {
    return timetableRepository.create({ ...data, schoolId })
  },

  async update(id: string, schoolId: string, data: UpdateTimetableInput) {
    await timetableService.getById(id, schoolId)
    return timetableRepository.update(id, data)
  },

  async delete(id: string, schoolId: string) {
    await timetableService.getById(id, schoolId)
    return timetableRepository.delete(id)
  },
}
