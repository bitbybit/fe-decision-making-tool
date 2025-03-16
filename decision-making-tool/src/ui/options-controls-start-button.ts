import { Component } from '@/ui/component'

export class OptionsControlsStartButton extends Component {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded',
      text: 'Start'
    })

    this.addListener('click', () => console.log('Starting...'))
  }
}
