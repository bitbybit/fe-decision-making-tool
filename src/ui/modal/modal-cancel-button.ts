import { Component } from '@/ui/component'

export class ModalCancelButton extends Component<'button'> {
  constructor() {
    super({ tag: 'button', className: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded', text: 'Cancel' })
  }
}
