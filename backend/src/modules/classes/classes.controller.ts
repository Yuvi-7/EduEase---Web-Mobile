import type { Request, Response, NextFunction } from 'express'
import { classesService } from './classes.service'
import { success } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const result = await classesService.list(req.user.schoolId, req.query as any)
    res.json(success(result.classes, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const cls = await classesService.getById(String(req.params.id), req.user.schoolId)
    res.json(success(cls))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const cls = await classesService.create(req.user.schoolId, req.body)
    res.status(201).json(success(cls))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const cls = await classesService.update(String(req.params.id), req.user.schoolId, req.body)
    res.json(success(cls))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    await classesService.delete(String(req.params.id), req.user.schoolId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}
