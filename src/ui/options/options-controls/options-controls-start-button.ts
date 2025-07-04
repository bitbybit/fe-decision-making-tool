import { Component } from '@/ui/component'

export class OptionsControlsStartButton extends Component<'button'> {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded w-3/5',
      text: 'Start'
    })
  }
}
