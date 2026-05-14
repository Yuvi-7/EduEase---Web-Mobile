import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { config } from './config'
import { errorHandler } from './shared/middleware/errorHandler'
import { apiRouter } from './routes'

const app = express()

// ─── Global Middleware ────────────────────────────────────────────────────────

app.use(helmet())

app.use(
  cors({
    origin: config.CORS_ORIGINS,
    credentials: true,
  }),
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use(
  morgan(config.NODE_ENV === 'production' ? 'combined' : 'dev'),
)

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests', code: 'RATE_LIMITED' },
  }),
)

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── API Routes ───────────────────────────────────────────────────────────────

app.use('/api/v1', apiRouter)

// ─── 404 Handler ──────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found', code: 'NOT_FOUND' })
})

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use(errorHandler)

export { app }
