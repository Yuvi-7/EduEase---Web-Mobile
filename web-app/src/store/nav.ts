import { create } from 'zustand'

export type SchoolPage =
  | 'dashboard' | 'students' | 'teachers' | 'parents'
  | 'classes' | 'attendance' | 'timetable' | 'fees'
  | 'messages' | 'reports' | 'settings'

export type SuperPage =
  | 'schools' | 'people' | 'reports' | 'billing'
  | 'licensing' | 'support' | 'settings' | 'security'

interface NavState {
  schoolPage: SchoolPage
  superPage: SuperPage
  setSchoolPage: (page: SchoolPage) => void
  setSuperPage: (page: SuperPage) => void
}

export const useNavStore = create<NavState>()((set) => ({
  schoolPage: 'dashboard',
  superPage: 'schools',
  setSchoolPage: (schoolPage) => set({ schoolPage }),
  setSuperPage:  (superPage)  => set({ superPage }),
}))
