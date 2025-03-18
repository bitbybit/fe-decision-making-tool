import { Component } from '@/ui/component'

export class OptionsControlsPasteButton extends Component {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-1/4',
      text: 'Paste'
    })

    this.addListener('click', () => console.log('Pasting...'))
  }
}
