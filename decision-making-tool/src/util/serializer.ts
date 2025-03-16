import OptionList from '@/model/option-list'
import { isOption } from '@/util/type-guard'
import { Option } from '@/model/option'

/**
 * Convert OptionList to JSON string
 * @param value OptionList entity
 * @returns JSON string
 */
export function optionListToJson(value: OptionList): string {
  return JSON.stringify(value.allOptions)
}

/**
 * Convert JSON string to OptionList
 * @param value JSON string
 * @returns OptionList entity
 */
export function jsonToOptionList(value: string): OptionList {
  const parsed: unknown = JSON.parse(value)

  if (!Array.isArray(parsed) || !parsed.every((option) => isOption(option))) {
    throw new TypeError(`${value} is not a valid list of options`)
  }

  const options = parsed.map(({ id, title, weight }) => new Option(id, title, weight))

  return new OptionList(options)
}
