import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

// ── Credential map → role + user ─────────────────────────────────────
import type { AppRole, AuthUser } from '@/store/auth'

interface Credential {
  role: AppRole
  user: AuthUser
}

export const CREDENTIAL_MAP: Record<string, Credential> = {
  'maya@lakeside.edu::admin123': {
    role: 'school-admin',
    user: {
      name: 'Maya Singh',
      email: 'maya@lakeside.edu',
      roleLabel: 'Principal',
      initials: 'MS',
      accentColor: 'var(--scholar-600)',
    },
  },
  'neha@eduease.com::super123': {
    role: 'super-admin',
    user: {
      name: 'Neha Khan',
      email: 'neha@eduease.com',
      roleLabel: 'District Lead · 8 schools',
      initials: 'NK',
      accentColor: 'var(--coral-600)',
    },
  },
  'anita@lakeside.edu::teacher123': {
    role: 'school-admin',
    user: {
      name: 'Anita Rao',
      email: 'anita@lakeside.edu',
      roleLabel: 'Mathematics Teacher',
      initials: 'AR',
      accentColor: 'var(--mint-600)',
    },
  },
}
