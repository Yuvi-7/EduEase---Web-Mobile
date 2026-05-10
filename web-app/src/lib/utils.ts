import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const AV_COLORS = ['#5B5BE5', '#FF8A6A', '#2DBA73', '#F0A52A', '#8C5BD6', '#E14B6A', '#3F8FE0']

export function avatarColor(name: string): string {
  return AV_COLORS[name.charCodeAt(0) % AV_COLORS.length]
}

export function initials(name: string): string {
  return name.split(' ').map(p => p[0]).slice(0, 2).join('')
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
