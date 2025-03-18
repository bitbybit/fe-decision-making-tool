import { Component } from '@/ui/component'

export class ModalContainer extends Component {
  constructor(...children: Component[]) {
    super({ tag: 'div', className: 'modal-content p-4 bg-white rounded shadow-lg', text: '' }, ...children)
  }
}
