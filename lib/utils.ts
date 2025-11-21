import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MELI_KEYWORDS = [
  'meli',
  'mercado livre',
  'mercadolivre',
  'mercadolibre',
  'ml.com',
]

const MELI_CODE_REGEX = /\b(?:ML)?\d{10}\b/i

export function isMeliRecord(row: Record<string, unknown>): boolean {
  if (!row) return false

  return Object.values(row).some((value) => {
    if (value == null) return false
    const stringValue = String(value)
    if (!stringValue.trim()) return false

    const normalized = stringValue.toLowerCase()
    if (MELI_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
      return true
    }

    return MELI_CODE_REGEX.test(stringValue)
  })
}