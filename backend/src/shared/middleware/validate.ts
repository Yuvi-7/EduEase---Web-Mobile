import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema } from 'zod'
import { AppError } from '../errors/AppError'

type RequestField = 'body' | 'query' | 'params'

export function validate(schema: ZodSchema, field: RequestField = 'body') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[field])

    if (!result.success) {
      return next(AppError.validationError(result.error.flatten()))
    }

    req[field] = result.data
    next()
  }
}
