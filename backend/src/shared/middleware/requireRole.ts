import type { Request, Response, NextFunction } from 'express'
import type { Role } from '@prisma/client'
import { AppError } from '../errors/AppError'

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(AppError.unauthorized())
    }
    if (!roles.includes(req.user.role)) {
      return next(AppError.forbidden('You do not have permission to access this resource'))
    }
    next()
  }
}
