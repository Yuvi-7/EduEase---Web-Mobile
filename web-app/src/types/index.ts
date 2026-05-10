export type Role = 'school-admin' | 'super-admin'

export interface Student {
  id: string
  name: string
  grade: string
  guardian: string
  fees: 'paid' | 'due' | 'overdue'
  attendance: number
  status: 'active' | 'inactive'
}

export interface Teacher {
  id: string
  name: string
  subj: string
  classes: string
  email: string
  status: 'active' | 'leave'
  load: number
}

export interface ClassSection {
  id: string
  grade: number
  students: number
  teacher: string
  room: string
  avgGrade: string
  attendance: number
}

export interface Invoice {
  id: string
  student: string
  grade: string
  amt: number
  due: string
  status: 'paid' | 'due' | 'overdue' | 'partial'
  paid: string
}

export interface MessageThread {
  id: number
  from: string
  role: string
  preview: string
  t: string
  unread: boolean
  color: string
}

export interface School {
  name: string
  city: string
  students: number
  teachers: number
  attend: number
  fee: number
  plan: 'Scale' | 'Growth' | 'Starter'
  tone: 'mint' | 'amber' | 'rose'
  trend: number[]
}

export interface Parent {
  name: string
  linked: string
  email: string
  status: 'Active' | 'Pending'
}
