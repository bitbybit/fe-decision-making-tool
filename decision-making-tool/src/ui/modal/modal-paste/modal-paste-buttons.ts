import { Component } from '@/ui/component'

export class ModalPasteButtons extends Component<'div'> {
  constructor(...children: Component<keyof HTMLElementTagNameMap>[]) {
    super({ tag: 'div', className: 'flex gap-2 justify-end mt-4', text: '' }, ...children)
  }
}
