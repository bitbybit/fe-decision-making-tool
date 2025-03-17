import { Component } from '@/ui/component'
import { OptionsControlsAddButton } from '@/ui/options-controls-add-button'
import { OptionsControlsPasteButton } from '@/ui/options-controls-paste-button'
import { OptionsControlsClearButton } from '@/ui/options-controls-clear-button'
import { OptionsControlsSaveButton } from '@/ui/options-controls-save-button'
import { OptionsControlsLoadButton } from '@/ui/options-controls-load-button'
import { OptionsControlsStartButton } from '@/ui/options-controls-start-button'

export class OptionsControls extends Component {
  private readonly addButton: OptionsControlsAddButton
  private readonly pasteButton: OptionsControlsPasteButton
  private readonly clearButton: OptionsControlsClearButton
  private readonly saveButton: OptionsControlsSaveButton
  private readonly loadButton: OptionsControlsLoadButton
  private readonly startButton: OptionsControlsStartButton

  constructor() {
    super({ tag: 'div', className: 'flex flex-wrap gap-2 justify-center' })

    this.addButton = new OptionsControlsAddButton()
    this.pasteButton = new OptionsControlsPasteButton()
    this.clearButton = new OptionsControlsClearButton()
    this.saveButton = new OptionsControlsSaveButton()
    this.loadButton = new OptionsControlsLoadButton()
    this.startButton = new OptionsControlsStartButton()

    this.addButton.addListener('click', () => {
      this.eventTarget.dispatchEvent(new CustomEvent('click:add'))
    })

    this.pasteButton.addListener('click', () => {
      this.eventTarget.dispatchEvent(new CustomEvent('click:paste'))
    })

    this.clearButton.addListener('click', () => {
      this.eventTarget.dispatchEvent(new CustomEvent('click:clear'))
    })

    this.saveButton.addListener('click', () => {
      this.eventTarget.dispatchEvent(new CustomEvent('click:save'))
    })

    this.loadButton.addListener('click', () => {
      this.eventTarget.dispatchEvent(new CustomEvent('click:load'))
    })

    this.startButton.addListener('click', () => {
      this.eventTarget.dispatchEvent(new CustomEvent('click:start'))
    })

    this.appendChildren([
      this.addButton,
      this.pasteButton,
      this.clearButton,
      this.saveButton,
      this.loadButton,
      this.startButton
    ])
  }
}
