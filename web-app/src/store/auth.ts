import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AppRole = 'school-admin' | 'super-admin'

export interface AuthUser {
  name: string
  email: string
  roleLabel: string
  initials: string
  accentColor: string
}

interface AuthState {
  role: AppRole | null
  user: AuthUser | null
  login: (role: AppRole, user: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      user: null,
      login: (role, user) => set({ role, user }),
      logout: () => set({ role: null, user: null }),
    }),
    { name: 'eduease-auth' }
  )
)
