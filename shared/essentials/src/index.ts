export function isValidDate(d: unknown): d is Date {
  return d instanceof Date && !isNaN(d.getTime())
}
