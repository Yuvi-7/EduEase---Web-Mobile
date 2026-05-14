import { Router } from 'express'
import { validate } from '../../shared/middleware/validate'
import { authenticate } from '../../shared/middleware/authenticate'
import { loginDto, refreshDto } from './auth.dto'
import * as authController from './auth.controller'

export const authRouter = Router()

authRouter.post('/login', validate(loginDto), authController.login)
authRouter.post('/refresh', validate(refreshDto), authController.refresh)
authRouter.post('/logout', validate(refreshDto), authController.logout)
authRouter.get('/me', authenticate, authController.me)
