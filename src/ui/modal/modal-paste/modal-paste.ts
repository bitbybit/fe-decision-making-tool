import { Modal } from '@/ui/modal/modal'
import { ModalContainer } from '@/ui/modal/modal-container'
import { ModalPasteTextarea } from '@/ui/modal/modal-paste/modal-paste-textarea'
import { ModalPasteButtons } from '@/ui/modal/modal-paste/modal-paste-buttons'
import { ModalPasteConfirmButton } from '@/ui/modal/modal-paste/modal-paste-confirm-button'
import { ModalCancelButton } from '@/ui/modal/modal-cancel-button'

export type ModalPasteConfirmPayload = {
  value: string
}

export class ModalPaste extends Modal {
  private readonly container: ModalContainer
  private readonly textArea: ModalPasteTextarea
  private readonly buttons: ModalPasteButtons
  private readonly confirmButton: ModalPasteConfirmButton
  private readonly cancelButton: ModalCancelButton

  constructor() {
    super({ className: 'modal-paste' })

    this.textArea = new ModalPasteTextarea()
    this.confirmButton = new ModalPasteConfirmButton()
    this.cancelButton = new ModalCancelButton()
    this.buttons = new ModalPasteButtons(this.confirmButton, this.cancelButton)
    this.container = new ModalContainer(this.textArea, this.buttons)

    this.confirmButton.addListener('click', () => {
      const textAreaNode = this.textArea.getNode()

      this.eventTarget.dispatchEvent(
        new CustomEvent<ModalPasteConfirmPayload>('click:confirm', {
          detail: { value: textAreaNode.value }
        })
      )

      textAreaNode.value = ''
      this.close()
    })

    this.cancelButton.addListener('click', () => this.close())

    this.append(this.container)
  }
}
