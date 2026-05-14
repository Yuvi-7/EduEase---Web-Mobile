import type { Request, Response, NextFunction } from 'express'
import { schoolsService } from './schools.service'
import { success } from '../../shared/utils/response'

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await schoolsService.list(req.query as any)
    res.json(success(result.schools, result.meta))
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const school = await schoolsService.getById(String(req.params.id))
    res.json(success(school))
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const school = await schoolsService.create(req.body)
    res.status(201).json(success(school))
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const school = await schoolsService.update(String(req.params.id), req.body)
    res.json(success(school))
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await schoolsService.delete(String(req.params.id))
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}
