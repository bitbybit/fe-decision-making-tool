import { Component } from '@/ui/component'

export class OptionsControlsSaveButton extends Component {
  constructor() {
    super({
      tag: 'button',
      className: 'bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded w-1/3',
      text: 'Save'
    })
  }
}
