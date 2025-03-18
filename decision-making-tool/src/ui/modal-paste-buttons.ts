import { Component } from '@/ui/component'

export class ModalPasteButtons extends Component {
  constructor(...children: Component[]) {
    super({ tag: 'div', className: 'flex gap-2 justify-end mt-4', text: '' }, ...children)
  }
}
