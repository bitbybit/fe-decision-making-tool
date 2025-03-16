import { Component } from '@/ui/component'

export class OptionsControlsPasteButton extends Component {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded',
      text: 'Paste List'
    })

    this.addListener('click', () => console.log('Pasting...'))
  }
}
