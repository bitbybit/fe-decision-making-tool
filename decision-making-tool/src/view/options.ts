import { type RouteView } from '@/router'
import { BaseView } from '@/view/base'
import { OptionModel } from '@/model/option'
import { OptionItem } from '@/ui/option-item'
import { OptionsContainer } from '@/ui/options-container'
import { Header } from '@/ui/header'
import { Options } from '@/ui/options'
import { OptionsControls } from '@/ui/options-controls'
import { jsonToOptionList, optionListToJson } from '@/util/serializer'
import { loadDataFromJson, saveDataToJson } from '@/util/file'
import { isDataJson, isObject } from '@/util/type-guard'
import { state } from '@/state'

export class OptionsView extends BaseView implements RouteView {
  public readonly container: OptionsContainer

  private readonly header: Header
  private readonly options: Options
  private readonly controls: OptionsControls

  constructor() {
    super()

    this.header = new Header()
    this.options = new Options()
    this.controls = new OptionsControls()
    this.container = new OptionsContainer(this.header, this.options, this.controls)

    this.controls.eventTarget.addEventListener('click:add', () => {
      const id = String(state.incrementOptionCounter())

      state.optionList.addOption(new OptionModel(id, '', 0))
      state.persist()

      this.options.append(new OptionItem({ id }))
    })

    this.controls.eventTarget.addEventListener('click:clear', () => {
      state.clear()
      this.options.destroyChildren()
    })

    this.controls.eventTarget.addEventListener('click:save', () => {
      const data = {
        optionList: optionListToJson(state.optionList),
        optionCounter: state.optionCounter
      }

      saveDataToJson('data.json', JSON.stringify(data))
    })

    this.controls.eventTarget.addEventListener('click:load', () => {
      loadDataFromJson()
        .then((data) => {
          const parsed: unknown = JSON.parse(data)

          if (!isDataJson(parsed)) {
            throw new TypeError('Invalid JSON')
          }

          this.options.destroyChildren()
          state.load(jsonToOptionList(parsed.optionList), parsed.optionCounter)
          this.initOptionItems()

          return true
        })
        .catch((error) => {
          console.error(error)
        })
    })

    this.controls.eventTarget.addEventListener('click:start', () => {
      this.router?.navigate('/picker')
    })

    this.initOptionItems()
  }

  private initOptionItems(): void {
    for (const { id, title, weight } of state.optionList.entries) {
      this.options.append(new OptionItem({ id, title, weight: String(weight) }))
    }
  }
}
