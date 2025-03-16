import { type Option } from '@/model/option'

/**
 * If value is an object
 * @param value Value to check
 * @returns Boolean result
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * If value has Option entity fields
 * @param value Value to check
 * @returns Boolean result
 */
export function isOption(value: unknown): value is Option {
  return (
    isObject(value) &&
    typeof value?.id === 'string' &&
    typeof value?.title === 'string' &&
    typeof value?.weight === 'number'
  )
}
