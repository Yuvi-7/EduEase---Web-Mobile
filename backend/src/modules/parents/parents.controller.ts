import type { Request, Response, NextFunction } from 'express'
import { parentsService } from './parents.service'
import { success } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const result = await parentsService.list(req.user.schoolId, req.query as any)
    res.json(success(result.parents, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const parent = await parentsService.getById(String(req.params.id), req.user.schoolId)
    res.json(success(parent))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const parent = await parentsService.create(req.user.schoolId, req.body)
    res.status(201).json(success(parent))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const parent = await parentsService.update(String(req.params.id), req.user.schoolId, req.body)
    res.json(success(parent))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    await parentsService.delete(String(req.params.id), req.user.schoolId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}
