import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../../config'
import { AppError } from '../errors/AppError'
import type { Role } from '@prisma/client'

export interface AuthUser {
  id: string
  role: Role
  schoolId: string | null
  name: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user: AuthUser
    }
  }
}

interface JwtPayload {
  sub: string
  role: Role
  schoolId: string | null
  name: string
  email: string
  iat: number
  exp: number
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return next(AppError.unauthorized('Missing or malformed Authorization header'))
  }

  const token = authHeader.slice(7)

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as JwtPayload
    req.user = {
      id: payload.sub,
      role: payload.role,
      schoolId: payload.schoolId,
      name: payload.name,
      email: payload.email,
    }
    next()
  } catch {
    next(AppError.unauthorized('Invalid or expired access token'))
  }
}
