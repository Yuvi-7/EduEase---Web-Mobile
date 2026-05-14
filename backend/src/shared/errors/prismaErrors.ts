import { Prisma } from '@prisma/client'
import { AppError } from './AppError'

export function handlePrismaError(err: unknown): AppError {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return AppError.conflict('A record with this value already exists')
      case 'P2025':
        return AppError.notFound()
      case 'P2003':
        return AppError.badRequest('Related record not found')
      case 'P2014':
        return AppError.badRequest('The relation constraint was violated')
      default:
        return new AppError(`Database error: ${err.code}`, 500, 'DB_ERROR')
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return AppError.badRequest('Invalid data provided to database')
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    return new AppError('Database connection failed', 503, 'DB_UNAVAILABLE')
  }

  return new AppError('Internal server error', 500, 'INTERNAL_ERROR')
}
