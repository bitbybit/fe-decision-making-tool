import { type OptionModel } from '@/model/option'

export class OptionListModel {
  private readonly options: OptionModel[]

  constructor(options: OptionModel[] = []) {
    this.options = options
  }

  public get entries(): OptionModel[] {
    return this.options
  }

  public addOption(option: OptionModel): void {
    this.options.push(option)
  }

  public updateOption(updatedOption: OptionModel): boolean {
    const index = this.options.findIndex((option) => option.id === updatedOption.id)

    if (index !== -1) {
      this.options[index] = updatedOption
      return true
    }

    return false
  }

  public deleteOption(optionId: OptionModel['id']): boolean {
    const index = this.options.findIndex((option) => option.id === optionId)

    if (index !== -1) {
      this.options.splice(index, 1)
      return true
    }

    return false
  }

  public getOptionById(optionId: OptionModel['id']): OptionModel | undefined {
    return this.options.find((option) => option.id === optionId)
  }
}
