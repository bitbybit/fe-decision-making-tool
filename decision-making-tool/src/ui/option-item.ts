import { Component } from '@/ui/component'
import { OptionItemId } from '@/ui/option-item-id'
import { OptionItemTitleInput } from '@/ui/option-item-title-input'
import { OptionItemWeightInput } from '@/ui/option-item-weight-input'
import { OptionItemDeleteButton } from '@/ui/option-item-delete-button'
import { state } from '@/state'
import { isHtmlInput } from '@/util/type-guard'

export class OptionItem extends Component {
  private readonly id: OptionItemId
  private readonly titleInput: OptionItemTitleInput
  private readonly weightInput: OptionItemWeightInput
  private readonly deleteButton: OptionItemDeleteButton

  constructor({ id, title = '', weight = '' }: { id: string; title?: string; weight?: string }) {
    super({ tag: 'div', className: 'flex gap-2 items-center p-2 border-b' })

    this.id = new OptionItemId({ id: `#${id}` })
    this.titleInput = new OptionItemTitleInput({ title })
    this.weightInput = new OptionItemWeightInput({ weight })
    this.deleteButton = new OptionItemDeleteButton()

    this.titleInput.addListener('input', (event: Event) => {
      const option = state.optionList.getOptionById(id)

      if (option === undefined || !isHtmlInput(event.target)) {
        return
      }

      option.title = event.target.value
      state.persist()
    })

    this.weightInput.addListener('input', (event: Event) => {
      const option = state.optionList.getOptionById(id)

      if (option === undefined || !isHtmlInput(event.target)) {
        return
      }

      option.weight = Number(event.target.value)
      state.persist()
    })

    this.deleteButton.addListener('click', () => {
      if (!state.optionList.deleteOption(id)) {
        return
      }

      state.decrementOptionCounter()
      state.persist()
      this.destroy()
    })

    this.appendChildren([this.id, this.titleInput, this.weightInput, this.deleteButton])
  }
}
