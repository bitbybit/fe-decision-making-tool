import { Component } from '@/ui/component'

export class OptionsControlsLoadButton extends Component<'button'> {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-1/3',
      text: 'Load'
    })
  }
}
