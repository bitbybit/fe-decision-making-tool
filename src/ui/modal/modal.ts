import { Component } from '@/ui/component'

export class Modal extends Component<'dialog'> {
  private readonly handleEscapeKeyPressBound = this.handleEscapeKeyPress.bind(this)

  constructor({ className = '' } = {}) {
    super({ tag: 'dialog', className: `modal ${className}`, text: '' })

    document.body.append(this.getNode())

    this.addListener('click', (event) => {
      if (event.target === this.getNode()) {
        this.close()
      }
    })
  }

  public open(): void {
    const node = this.getNode()

    document.body.classList.add('overflow-hidden')

    node.showModal()

    document.addEventListener('keydown', this.handleEscapeKeyPressBound)
  }

  public close(): void {
    const node = this.getNode()

    document.body.classList.remove('overflow-hidden')

    node.close()

    document.removeEventListener('keydown', this.handleEscapeKeyPressBound)
  }

  private handleEscapeKeyPress(event: KeyboardEvent): void {
    if (event.key !== 'Escape') {
      return
    }

    this.close()
  }
}
