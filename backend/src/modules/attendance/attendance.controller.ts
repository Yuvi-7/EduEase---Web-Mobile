import type { Request, Response, NextFunction } from 'express'
import { attendanceService } from './attendance.service'
import { success } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'
import type { AttendanceStatus } from '@prisma/client'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const result = await attendanceService.list(req.user.schoolId, req.query as any)
    res.json(success(result.attendance, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function markBulk(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user.schoolId) throw AppError.forbidden('No school context')
    const records = await attendanceService.markBulk(req.user.schoolId, req.body)
    res.status(201).json(success(records))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const record = await attendanceService.update(String(req.params.id), req.body.status as AttendanceStatus)
    res.json(success(record))
  } catch (err) {
    next(err)
  }
}
