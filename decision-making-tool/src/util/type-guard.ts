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

/**
 * If target is input element
 * @param target element to check
 * @returns Boolean result
 */
export function isHtmlInput(target: unknown): target is HTMLInputElement {
  return target instanceof HTMLInputElement
}

/**
 * If value is data from loaded JSON file
 * @param value Value to check
 * @returns Boolean result
 */
export function isDataJson(value: unknown): value is {
  optionList: string
  optionCounter: number
} {
  return isObject(value) && typeof value?.optionList === 'string' && typeof value?.optionCounter === 'number'
}
