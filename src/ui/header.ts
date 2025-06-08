import { Component } from '@/ui/component'

export class Header extends Component<'h1'> {
  constructor() {
    super({
      tag: 'h1',
      className: 'text-3xl font-bold text-center',
      text: 'Decision Making Tool'
    })
  }
}
