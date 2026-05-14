import winston from 'winston'
import { config } from '../../config'

const { combine, timestamp, colorize, simple, json, errors } = winston.format

export const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format:
    config.NODE_ENV === 'production'
      ? combine(timestamp(), errors({ stack: true }), json())
      : combine(colorize(), timestamp({ format: 'HH:mm:ss' }), errors({ stack: true }), simple()),
  transports: [new winston.transports.Console()],
  exitOnError: false,
})
