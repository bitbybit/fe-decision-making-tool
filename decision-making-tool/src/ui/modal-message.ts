import { Modal } from '@/ui/modal'
import { ModalContainer } from '@/ui/modal-container'
import { ModalMessageText } from '@/ui/modal-message-text'
import { ModalCancelButton } from '@/ui/modal-cancel-button'

export class ModalMessage extends Modal {
  private readonly container: ModalContainer
  private readonly text: ModalMessageText
  private readonly cancelButton: ModalCancelButton

  constructor() {
    super({ className: 'modal-message' })

    this.text = new ModalMessageText()
    this.cancelButton = new ModalCancelButton()
    this.container = new ModalContainer(this.text, this.cancelButton)

    this.cancelButton.addListener('click', () => this.close())

    this.append(this.container)
  }

  public display(text: string = ''): void {
    this.text.getNode().textContent = text
    this.open()
  }
}
