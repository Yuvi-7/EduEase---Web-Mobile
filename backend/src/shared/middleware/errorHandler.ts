import type { ErrorRequestHandler } from 'express'
import { AppError } from '../errors/AppError'
import { handlePrismaError } from '../errors/prismaErrors'
import { logger } from '../utils/logger'
import { config } from '../../config'

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const appErr = err instanceof AppError ? err : handlePrismaError(err)

  if (appErr.statusCode >= 500) {
    logger.error(appErr.message, {
      code: appErr.code,
      path: req.path,
      method: req.method,
      stack: err.stack,
    })
  } else {
    logger.warn(appErr.message, {
      code: appErr.code,
      path: req.path,
      method: req.method,
    })
  }

  res.status(appErr.statusCode).json({
    success: false,
    error: appErr.message,
    code: appErr.code,
    ...(config.NODE_ENV !== 'production' && appErr.details ? { details: appErr.details } : {}),
  })
}
