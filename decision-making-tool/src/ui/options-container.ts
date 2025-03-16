import { Component } from '@/ui/component'

export class OptionsContainer extends Component {
  constructor(...children: Component[]) {
    super({ tag: 'div', className: 'p-4 flex flex-col space-y-4' }, ...children)
  }
}
