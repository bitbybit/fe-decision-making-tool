import { type RouteView } from '@/router'
import { BaseView } from '@/view/base'
import { OptionModel } from '@/model/option'
import { Header } from '@/ui/header'
import { Options } from '@/ui/options'
import { OptionsContainer } from '@/ui/options-container'
import { OptionItem } from '@/ui/option-item'
import { OptionsControls } from '@/ui/options-controls'
import { ModalPaste } from '@/ui/modal-paste'
import { ModalMessage } from '@/ui/modal-message'
import { jsonToOptionList, optionListToJson } from '@/util/serializer'
import { loadDataFromJson, saveDataToJson } from '@/util/file'
import { isDataJson, isModalPasteConfirmPayload } from '@/util/type-guard'
import { state } from '@/state'
import { parseCSVLine } from '@/util/csv'

export class OptionsView extends BaseView implements RouteView {
  public readonly container: OptionsContainer
  private readonly header: Header
  private readonly options: Options
  private readonly controls: OptionsControls
  private readonly modalPaste: ModalPaste
  private readonly modalMessage: ModalMessage

  private readonly minOptionAmountToStart = 2

  constructor() {
    super()

    this.header = new Header()
    this.options = new Options()
    this.controls = new OptionsControls()
    this.container = new OptionsContainer(this.header, this.options, this.controls)
    this.modalPaste = new ModalPaste()
    this.modalMessage = new ModalMessage()

    this.controls.eventTarget.addEventListener('click:add', () => {
      this.createOption()
    })

    this.controls.eventTarget.addEventListener('click:paste', () => {
      this.modalPaste.open()
    })

    this.modalPaste.eventTarget.addEventListener('click:confirm', (payload) => {
      if (!isModalPasteConfirmPayload(payload)) {
        return
      }

      this.parsePastedOptions(payload.detail.value)
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
      if (state.optionList.entries.length < this.minOptionAmountToStart) {
        this.modalMessage.display(`Please add at least ${this.minOptionAmountToStart} valid options.`)
        return
      }

      this.router?.navigate('/picker')
    })

    this.initOptionItems()
  }

  private initOptionItems(): void {
    for (const { id, title, weight } of state.optionList.entries) {
      this.renderOption(id, title, String(weight))
    }
  }

  private parsePastedOptions(value: string): void {
    const lines = value.split('\n').filter((line) => line.trim() !== '')

    for (const line of lines) {
      const [title, weight] = parseCSVLine(line)

      this.createOption(title, Number(weight))
    }
  }

  private createOption(title: string = '', weight: number = 0): void {
    const id = String(state.incrementOptionCounter())

    state.optionList.addOption(new OptionModel(id, title, weight))
    state.persist()

    this.renderOption(id, title, String(weight))
  }

  private renderOption(id: string, title: string, weight: string): void {
    this.options.append(new OptionItem({ id, title, weight }))
  }
}
