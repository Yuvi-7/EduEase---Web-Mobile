import crypto from 'crypto'
import jwt, { type SignOptions } from 'jsonwebtoken'
import { config } from '../../config'
import { AppError } from '../../shared/errors/AppError'
import { comparePassword } from '../../shared/utils/hash'
import { authRepository } from './auth.repository'
import type { AuthResponse, JwtPayload } from './auth.types'

const REFRESH_TOKEN_DAYS = 7

export const authService = {
  async login(email: string, password: string, schoolCode?: string): Promise<AuthResponse> {
    const user = await authRepository.findUserByEmail(email)
    if (!user) {
      throw AppError.unauthorized('Invalid credentials')
    }

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) {
      throw AppError.unauthorized('Invalid credentials')
    }

    if (schoolCode) {
      const school = await authRepository.findSchoolByCode(schoolCode)
      if (!school || school.id !== user.schoolId) {
        throw AppError.unauthorized('Invalid school code')
      }
    }

    const accessToken = signAccessToken({
      sub: user.id,
      role: user.role,
      schoolId: user.schoolId,
      name: user.name,
      email: user.email,
    })

    const refreshToken = crypto.randomUUID()
    await authRepository.createRefreshToken(user.id, refreshToken, getRefreshExpiry())

    return {
      tokens: { accessToken, refreshToken },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
      },
    }
  },

  async refresh(refreshToken: string) {
    const record = await authRepository.findRefreshToken(refreshToken)
    if (!record || record.expiresAt < new Date()) {
      throw AppError.unauthorized('Invalid or expired refresh token')
    }

    const { user } = record
    const newRefreshToken = crypto.randomUUID()

    await authRepository.rotateRefreshToken(
      refreshToken,
      newRefreshToken,
      getRefreshExpiry(),
      user.id,
    )

    const accessToken = signAccessToken({
      sub: user.id,
      role: user.role,
      schoolId: user.schoolId,
      name: user.name,
      email: user.email,
    })

    return { accessToken, refreshToken: newRefreshToken }
  },

  async logout(refreshToken: string) {
    try {
      await authRepository.deleteRefreshToken(refreshToken)
    } catch {
      // Token already deleted or doesn't exist — that's fine
    }
  },
}

function signAccessToken(payload: JwtPayload): string {
  const options: SignOptions = { expiresIn: config.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'] }
  return jwt.sign(payload as object, config.JWT_SECRET, options)
}

function getRefreshExpiry(): Date {
  return new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000)
}
