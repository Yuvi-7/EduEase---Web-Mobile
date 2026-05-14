import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { createStudentDto, updateStudentDto, listStudentsDto } from './students.dto'
import * as studentsController from './students.controller'

export const studentsRouter = Router()

studentsRouter.use(authenticate)
studentsRouter.use(requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN'))

studentsRouter.get('/', validate(listStudentsDto, 'query'), studentsController.list)
studentsRouter.post('/', validate(createStudentDto), studentsController.create)
studentsRouter.get('/:id', studentsController.getById)
studentsRouter.patch('/:id', validate(updateStudentDto), studentsController.update)
studentsRouter.delete('/:id', studentsController.remove)
