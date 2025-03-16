import { Component } from '@/ui/component'

export class OptionsControlsLoadButton extends Component {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded',
      text: 'Load List'
    })

    this.addListener('click', () => console.log('Loading...'))
  }
}
