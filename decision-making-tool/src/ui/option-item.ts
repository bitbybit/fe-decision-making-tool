import { Component } from '@/ui/component'
import { OptionItemId } from '@/ui/option-item-id'
import { OptionItemTitleInput } from '@/ui/option-item-title-input'
import { OptionItemWeightInput } from '@/ui/option-item-weight-input'
import { OptionItemDeleteButton } from '@/ui/option-item-delete-button'

export class OptionItem extends Component {
  private readonly id: OptionItemId
  private readonly titleInput: OptionItemTitleInput
  private readonly weightInput: OptionItemWeightInput
  private readonly deleteButton: OptionItemDeleteButton

  constructor({ id, title = '', weight = '' }: { id: string; title?: string; weight?: string }) {
    super({ tag: 'div', className: 'grid grid-cols-4 gap-2 items-center p-2 border-b' })

    this.id = new OptionItemId({ id })
    this.titleInput = new OptionItemTitleInput({ title })
    this.weightInput = new OptionItemWeightInput({ weight })

    this.deleteButton = new OptionItemDeleteButton()
    this.deleteButton.addListener('click', () => this.destroy())

    this.appendChildren([this.id, this.titleInput, this.weightInput, this.deleteButton])
  }
}
