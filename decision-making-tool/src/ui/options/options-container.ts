import { Component } from '@/ui/component'

export class OptionsContainer extends Component<'div'> {
  constructor(...children: Component<keyof HTMLElementTagNameMap>[]) {
    super({ tag: 'div', className: 'p-4 flex flex-col space-y-4' }, ...children)
  }
}
