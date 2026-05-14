import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { createSchoolDto, updateSchoolDto, listSchoolsDto } from './schools.dto'
import * as schoolsController from './schools.controller'

export const schoolsRouter = Router()

schoolsRouter.use(authenticate)
schoolsRouter.use(requireRole('SUPER_ADMIN'))

schoolsRouter.get('/', validate(listSchoolsDto, 'query'), schoolsController.list)
schoolsRouter.post('/', validate(createSchoolDto), schoolsController.create)
schoolsRouter.get('/:id', schoolsController.getById)
schoolsRouter.patch('/:id', validate(updateSchoolDto), schoolsController.update)
schoolsRouter.delete('/:id', schoolsController.remove)
