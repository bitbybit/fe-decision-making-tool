import { OptionListModel } from '@/model/option-list'
import { OptionModel } from '@/model/option'
import { isOption } from '@/util/type-guard'

/**
 * Convert OptionListModel to JSON string
 * @param value OptionListModel entity
 * @returns JSON string
 */
export function optionListToJson(value: OptionListModel): string {
  return JSON.stringify(value.entries)
}

/**
 * Convert JSON string to OptionListModel
 * @param value JSON string
 * @returns OptionListModel entity
 */
export function jsonToOptionList(value: string): OptionListModel {
  const parsed: unknown = JSON.parse(value)

  if (!Array.isArray(parsed) || !parsed.every((option) => isOption(option))) {
    throw new TypeError(`${value} is not a valid list of options`)
  }

  const options = parsed.map(({ id, title, weight }) => new OptionModel(id, title, weight))

  return new OptionListModel(options)
}
