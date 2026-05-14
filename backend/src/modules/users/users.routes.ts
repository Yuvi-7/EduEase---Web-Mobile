import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { requireRole } from '../../shared/middleware/requireRole'
import { validate } from '../../shared/middleware/validate'
import { createUserDto, updateUserDto, listUsersDto } from './users.dto'
import * as usersController from './users.controller'

export const usersRouter = Router()

usersRouter.use(authenticate)
usersRouter.use(requireRole('SUPER_ADMIN', 'SCHOOL_ADMIN'))

usersRouter.get('/', validate(listUsersDto, 'query'), usersController.list)
usersRouter.post('/', validate(createUserDto), usersController.create)
usersRouter.get('/:id', usersController.getById)
usersRouter.patch('/:id', validate(updateUserDto), usersController.update)
usersRouter.delete('/:id', usersController.remove)
