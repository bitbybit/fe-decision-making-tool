import { Component } from '@/ui/component'

export class ModalContainer extends Component<'div'> {
  constructor(...children: Component<keyof HTMLElementTagNameMap>[]) {
    super({ tag: 'div', className: 'modal-content p-4 bg-white rounded shadow-lg', text: '' }, ...children)
  }
}
