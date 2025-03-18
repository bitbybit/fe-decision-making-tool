import { Component } from '@/ui/component'

export class PickerBackButton extends Component<'button'> {
  constructor() {
    super({ tag: 'button', className: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded', text: 'Back' })
  }
}
