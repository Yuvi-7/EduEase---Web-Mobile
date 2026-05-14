import type { Request, Response, NextFunction } from 'express'
import { usersService } from './users.service'
import { success } from '../../shared/utils/response'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await usersService.list(req.user.schoolId, req.query as any)
    res.json(success(result.users, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.getById(String(req.params.id))
    res.json(success(user))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.create(req.body)
    res.status(201).json(success(user))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.update(String(req.params.id), req.body)
    res.json(success(user))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await usersService.delete(String(req.params.id))
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}
