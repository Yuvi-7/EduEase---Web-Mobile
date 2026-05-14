import type { Request, Response, NextFunction } from 'express'
import { studentsService } from './students.service'
import { success } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const result = await studentsService.list(req.user.schoolId, req.query as any)
    res.json(success(result.students, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const student = await studentsService.getById(String(req.params.id), req.user.schoolId)
    res.json(success(student))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const student = await studentsService.create(req.user.schoolId, req.body)
    res.status(201).json(success(student))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const student = await studentsService.update(String(req.params.id), req.user.schoolId, req.body)
    res.json(success(student))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    await studentsService.delete(String(req.params.id), req.user.schoolId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}
