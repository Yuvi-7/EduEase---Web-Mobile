import { Decimal } from '@prisma/client/runtime/library'
import { AppError } from '../../shared/errors/AppError'
import { buildMeta } from '../../shared/utils/pagination'
import { feesRepository } from './fees.repository'
import type { CreateFeeInput, UpdateFeeInput, ListFeesInput } from './fees.dto'
import type { FeeStatus } from '@prisma/client'

export const feesService = {
  async list(schoolId: string, filters: ListFeesInput) {
    const [fees, total] = await Promise.all([
      feesRepository.findMany(schoolId, {
        ...filters,
        status: filters.status as FeeStatus | undefined,
      }),
      feesRepository.count(schoolId, {
        studentId: filters.studentId,
        status: filters.status as FeeStatus | undefined,
      }),
    ])
    return { fees, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async getById(id: string, schoolId: string) {
    const fee = await feesRepository.findById(id, schoolId)
    if (!fee) throw AppError.notFound('Fee')
    return fee
  },

  async create(schoolId: string, data: CreateFeeInput) {
    return feesRepository.create({
      schoolId,
      studentId: data.studentId,
      amount: new Decimal(data.amount),
      dueDate: new Date(data.dueDate),
      label: data.label,
    })
  },

  async update(id: string, schoolId: string, data: UpdateFeeInput) {
    await feesService.getById(id, schoolId)
    return feesRepository.update(id, {
      ...(data.amount !== undefined ? { amount: new Decimal(data.amount) } : {}),
      ...(data.dueDate ? { dueDate: new Date(data.dueDate) } : {}),
      ...(data.paidDate ? { paidDate: new Date(data.paidDate) } : {}),
      ...(data.status ? { status: data.status as FeeStatus } : {}),
      ...(data.label !== undefined ? { label: data.label } : {}),
    })
  },
}
