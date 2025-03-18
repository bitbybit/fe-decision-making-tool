import { Modal } from '@/ui/modal'
import { ModalContainer } from '@/ui/modal-container'
import { ModalPasteTextarea } from '@/ui/modal-paste-textarea'
import { ModalPasteButtons } from '@/ui/modal-paste-buttons'
import { ModalPasteConfirmButton } from '@/ui/modal-paste-confirm-button'
import { ModalCancelButton } from '@/ui/modal-cancel-button'
import { isHtmlTextarea } from '@/util/type-guard'

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

      if (!isHtmlTextarea(textAreaNode)) {
        return
      }

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
