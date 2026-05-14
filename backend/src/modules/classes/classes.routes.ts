import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { createClassDto, updateClassDto, listClassesDto } from './classes.dto'
import * as classesController from './classes.controller'

export const classesRouter = Router()

classesRouter.use(authenticate)
classesRouter.use(requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN'))

classesRouter.get('/', validate(listClassesDto, 'query'), classesController.list)
classesRouter.post('/', validate(createClassDto), classesController.create)
classesRouter.get('/:id', classesController.getById)
classesRouter.patch('/:id', validate(updateClassDto), classesController.update)
classesRouter.delete('/:id', classesController.remove)
