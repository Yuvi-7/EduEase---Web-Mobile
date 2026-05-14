import type { Role } from '@prisma/client'

export interface JwtPayload {
  sub: string
  role: Role
  schoolId: string | null
  name: string
  email: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  tokens: AuthTokens
  user: {
    id: string
    name: string
    email: string
    role: Role
    schoolId: string | null
  }
}
