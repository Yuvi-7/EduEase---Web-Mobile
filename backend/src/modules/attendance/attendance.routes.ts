import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { bulkAttendanceDto, updateAttendanceDto, listAttendanceDto } from './attendance.dto'
import * as attendanceController from './attendance.controller'

export const attendanceRouter = Router()

attendanceRouter.use(authenticate)

attendanceRouter.get('/', requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN', 'TEACHER'), validate(listAttendanceDto, 'query'), attendanceController.list)
attendanceRouter.post('/bulk', requireRole('SCHOOL_ADMIN', 'TEACHER'), validate(bulkAttendanceDto), attendanceController.markBulk)
attendanceRouter.patch('/:id', requireRole('SCHOOL_ADMIN', 'TEACHER'), validate(updateAttendanceDto), attendanceController.update)
