import { Component } from '@/ui/component'

export class ModalMessageText extends Component<'div'> {
  constructor() {
    super({ tag: 'div', className: 'p-4', text: '' })
  }
}
