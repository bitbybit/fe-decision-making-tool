import type { Option } from '@/model/option'

export default class OptionList {
  private readonly options: Option[]

  constructor(options: Option[] = []) {
    this.options = options
  }

  public get allOptions(): Option[] {
    return this.options
  }

  public addOption(option: Option): void {
    this.options.push(option)
  }

  public updateOption(updatedOption: Option): boolean {
    const index = this.options.findIndex((option) => option.id === updatedOption.id)

    if (index !== -1) {
      this.options[index] = updatedOption
      return true
    }

    return false
  }

  public deleteOption(optionId: Option['id']): boolean {
    const index = this.options.findIndex((option) => option.id === optionId)

    if (index !== -1) {
      this.options.splice(index, 1)
      return true
    }

    return false
  }

  public getOptionById(optionId: Option['id']): Option | undefined {
    return this.options.find((option) => option.id === optionId)
  }
}
