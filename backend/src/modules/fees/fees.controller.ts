import type { Request, Response, NextFunction } from 'express'
import { feesService } from './fees.service'
import { success } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const result = await feesService.list(req.user.schoolId, req.query as any)
    res.json(success(result.fees, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const fee = await feesService.getById(String(req.params.id), req.user.schoolId)
    res.json(success(fee))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const fee = await feesService.create(req.user.schoolId, req.body)
    res.status(201).json(success(fee))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const fee = await feesService.update(String(req.params.id), req.user.schoolId, req.body)
    res.json(success(fee))
  } catch (err) {
    next(err)
  }
}
