import { Component } from '@/ui/component'

export class PickerControls extends Component<'div'> {
  constructor(...children: Component<keyof HTMLElementTagNameMap>[]) {
    super({ tag: 'div', className: 'flex flex-wrap gap-2 justify-center' }, ...children)
  }
}
