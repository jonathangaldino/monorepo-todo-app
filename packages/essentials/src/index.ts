import { randomBytes } from 'crypto'

export function isValidDate(d: unknown): d is Date {
  return d instanceof Date && !isNaN(d.getTime())
}

export function generateId() {
  return randomBytes(9).toString('base64url')
}
