import { app } from './app'
import { config } from './config'
import { logger } from './shared/utils/logger'
import { prisma } from './prisma/client'

async function bootstrap() {
  try {
    await prisma.$connect()
    logger.info('Database connected')

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT} [${config.NODE_ENV}]`)
    })
  } catch (err) {
    logger.error('Failed to start server', err)
    process.exit(1)
  }
}

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received — shutting down')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  logger.info('SIGINT received — shutting down')
  await prisma.$disconnect()
  process.exit(0)
})

bootstrap()
