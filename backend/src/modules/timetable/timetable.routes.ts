import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { createTimetableDto, updateTimetableDto, listTimetableDto } from './timetable.dto'
import * as timetableController from './timetable.controller'

export const timetableRouter = Router()

timetableRouter.use(authenticate)

timetableRouter.get('/', requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN', 'TEACHER', 'STUDENT'), validate(listTimetableDto, 'query'), timetableController.list)
timetableRouter.post('/', requireRole('SCHOOL_ADMIN'), validate(createTimetableDto), timetableController.create)
timetableRouter.patch('/:id', requireRole('SCHOOL_ADMIN'), validate(updateTimetableDto), timetableController.update)
timetableRouter.delete('/:id', requireRole('SCHOOL_ADMIN'), timetableController.remove)
