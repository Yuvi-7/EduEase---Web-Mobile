import { AppError } from '../../shared/errors/AppError'
import { hashPassword } from '../../shared/utils/hash'
import { buildMeta } from '../../shared/utils/pagination'
import { usersRepository } from './users.repository'
import type { CreateUserInput, UpdateUserInput, ListUsersInput } from './users.dto'
import type { Role } from '@prisma/client'

export const usersService = {
  async list(schoolId: string | null, filters: ListUsersInput) {
    const [users, total] = await Promise.all([
      usersRepository.findMany(schoolId, {
        ...filters,
        role: filters.role as Role | undefined,
      }),
      usersRepository.count(schoolId, {
        role: filters.role as Role | undefined,
        search: filters.search,
      }),
    ])

    return { users, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async getById(id: string) {
    const user = await usersRepository.findById(id)
    if (!user) throw AppError.notFound('User')
    return user
  },

  async create(data: CreateUserInput) {
    const passwordHash = await hashPassword(data.password)
    return usersRepository.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role as Role,
      schoolId: data.schoolId,
    })
  },

  async update(id: string, data: UpdateUserInput) {
    await usersService.getById(id)
    return usersRepository.update(id, {
      ...data,
      role: data.role as Role | undefined,
    })
  },

  async delete(id: string) {
    await usersService.getById(id)
    return usersRepository.softDelete(id)
  },
}
