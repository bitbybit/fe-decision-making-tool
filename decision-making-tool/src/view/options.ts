import { type RouteView } from '@/router'
import { BaseView } from '@/view/base'
import { OptionItem } from '@/ui/option-item'
import { OptionsContainer } from '@/ui/options-container'
import { Header } from '@/ui/header'
import { Options } from '@/ui/options'
import { OptionsControls } from '@/ui/options-controls'

export class OptionsView extends BaseView implements RouteView {
  public readonly container: OptionsContainer

  private readonly header: Header
  private readonly options: Options
  private readonly controls: OptionsControls

  private optionCounter = 0

  constructor() {
    super()

    this.header = new Header()
    this.options = new Options()
    this.controls = new OptionsControls()
    this.container = new OptionsContainer(this.header, this.options, this.controls)

    this.addOption()
  }

  private addOption(): void {
    this.optionCounter += 1

    const optionId = `#${this.optionCounter}`
    const optionItem = new OptionItem({ id: optionId })

    this.options.append(optionItem)
  }

  private deleteAllOptions(): void {
    this.options.destroyChildren()
    this.optionCounter = 1

    this.addOption()
  }
}
