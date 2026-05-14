import type { Request, Response, NextFunction } from 'express'
import { messagesService } from './messages.service'
import { success } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const result = await messagesService.list(req.user.schoolId, req.user.id, req.query as any)
    res.json(success(result.messages, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const message = await messagesService.create(req.user.schoolId, req.user.id, req.body)
    res.status(201).json(success(message))
  } catch (err) {
    next(err)
  }
}

export async function markAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await messagesService.markAsRead(String(req.params.id))
    res.json(success(message))
  } catch (err) {
    next(err)
  }
}
