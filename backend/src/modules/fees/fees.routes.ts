import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { createFeeDto, updateFeeDto, listFeesDto } from './fees.dto'
import * as feesController from './fees.controller'

export const feesRouter = Router()

feesRouter.use(authenticate)

feesRouter.get('/', requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN', 'PARENT'), validate(listFeesDto, 'query'), feesController.list)
feesRouter.get('/:id', requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN', 'PARENT'), feesController.getById)
feesRouter.post('/', requireRole('SCHOOL_ADMIN'), validate(createFeeDto), feesController.create)
feesRouter.patch('/:id', requireRole('SCHOOL_ADMIN'), validate(updateFeeDto), feesController.update)
