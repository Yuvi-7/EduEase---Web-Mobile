import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { createTeacherDto, updateTeacherDto, listTeachersDto } from './teachers.dto'
import * as teachersController from './teachers.controller'

export const teachersRouter = Router()

teachersRouter.use(authenticate)
teachersRouter.use(requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN'))

teachersRouter.get('/', validate(listTeachersDto, 'query'), teachersController.list)
teachersRouter.post('/', validate(createTeacherDto), teachersController.create)
teachersRouter.get('/:id', teachersController.getById)
teachersRouter.patch('/:id', validate(updateTeacherDto), teachersController.update)
teachersRouter.delete('/:id', teachersController.remove)
