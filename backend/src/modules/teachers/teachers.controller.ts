import type { Request, Response, NextFunction } from 'express'
import { teachersService } from './teachers.service'
import { success } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const result = await teachersService.list(req.user.schoolId, req.query as any)
    res.json(success(result.teachers, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const teacher = await teachersService.getById(String(req.params.id), req.user.schoolId)
    res.json(success(teacher))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const teacher = await teachersService.create(req.user.schoolId, req.body)
    res.status(201).json(success(teacher))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const teacher = await teachersService.update(String(req.params.id), req.user.schoolId, req.body)
    res.json(success(teacher))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    await teachersService.delete(String(req.params.id), req.user.schoolId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}
