import { Component } from '@/ui/component'

export class OptionItemDeleteButton extends Component {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-red-500 text-white px-2 py-1 rounded',
      text: '🗑'
    })
  }
}
