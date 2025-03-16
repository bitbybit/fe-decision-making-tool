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
