import { Component } from '@/ui/component'

export class PickerContainer extends Component<'div'> {
  constructor(...children: Component<keyof HTMLElementTagNameMap>[]) {
    super({ tag: 'div' }, ...children)
  }
}
