import type { Request, Response, NextFunction } from 'express'
import { timetableService } from './timetable.service'
import { success } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const entries = await timetableService.list(req.user.schoolId, req.query as any)
    res.json(success(entries))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const entry = await timetableService.create(req.user.schoolId, req.body)
    res.status(201).json(success(entry))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const entry = await timetableService.update(String(req.params.id), req.user.schoolId, req.body)
    res.json(success(entry))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    await timetableService.delete(String(req.params.id), req.user.schoolId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}
