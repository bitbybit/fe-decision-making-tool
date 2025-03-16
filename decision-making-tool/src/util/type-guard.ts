import { type OptionModel } from '@/model/option'

/**
 * If value is an object
 * @param value Value to check
 * @returns Boolean result
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * If value has OptionModel entity fields
 * @param value Value to check
 * @returns Boolean result
 */
export function isOption(value: unknown): value is OptionModel {
  return (
    isObject(value) &&
    typeof value?.id === 'string' &&
    typeof value?.title === 'string' &&
    typeof value?.weight === 'number'
  )
}
