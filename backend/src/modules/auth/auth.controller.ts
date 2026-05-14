import type { Request, Response, NextFunction } from 'express'
import { authService } from './auth.service'
import { success } from '../../shared/utils/response'

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, schoolCode } = req.body
    const result = await authService.login(email, password, schoolCode)
    res.json(success(result))
  } catch (err) {
    next(err)
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const tokens = await authService.refresh(req.body.refreshToken)
    res.json(success(tokens))
  } catch (err) {
    next(err)
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.logout(req.body.refreshToken)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export async function me(req: Request, res: Response) {
  res.json(success(req.user))
}
