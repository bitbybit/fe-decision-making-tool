import { Component } from '@/ui/component'

export class OptionsControlsAddButton extends Component<'button'> {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-1/4',
      text: 'Add'
    })
  }
}
