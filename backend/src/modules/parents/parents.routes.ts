import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { createParentDto, updateParentDto, listParentsDto } from './parents.dto'
import * as parentsController from './parents.controller'

export const parentsRouter = Router()

parentsRouter.use(authenticate)
parentsRouter.use(requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN'))

parentsRouter.get('/', validate(listParentsDto, 'query'), parentsController.list)
parentsRouter.post('/', validate(createParentDto), parentsController.create)
parentsRouter.get('/:id', parentsController.getById)
parentsRouter.patch('/:id', validate(updateParentDto), parentsController.update)
parentsRouter.delete('/:id', parentsController.remove)
