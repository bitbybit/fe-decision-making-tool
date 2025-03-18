import { Component } from '@/ui/component'

export class Container extends Component<'div'> {
  constructor() {
    super({ tag: 'div', className: 'h-full ml-auto mr-auto' })
  }
}
