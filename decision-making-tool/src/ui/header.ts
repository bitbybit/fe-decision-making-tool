import { Component } from '@/ui/component'

export class Header extends Component {
  constructor() {
    super({
      tag: 'h1',
      className: 'text-3xl font-bold text-center',
      text: 'Decision Making Tool'
    })
  }
}
