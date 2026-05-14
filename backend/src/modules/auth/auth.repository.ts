import { prisma } from '../../prisma/client'

export const authRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email, deletedAt: null },
      include: { school: { select: { id: true, code: true, name: true } } },
    })
  },

  findSchoolByCode(code: string) {
    return prisma.school.findUnique({
      where: { code, deletedAt: null },
    })
  },

  createRefreshToken(userId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: { userId, token, expiresAt },
    })
  },

  findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    })
  },

  deleteRefreshToken(token: string) {
    return prisma.refreshToken.delete({ where: { token } })
  },

  deleteAllUserRefreshTokens(userId: string) {
    return prisma.refreshToken.deleteMany({ where: { userId } })
  },

  async rotateRefreshToken(
    oldToken: string,
    newToken: string,
    newExpiry: Date,
    userId: string,
  ) {
    return prisma.$transaction([
      prisma.refreshToken.delete({ where: { token: oldToken } }),
      prisma.refreshToken.create({
        data: { userId, token: newToken, expiresAt: newExpiry },
      }),
    ])
  },
}
