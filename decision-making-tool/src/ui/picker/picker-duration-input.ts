import { Component } from '@/ui/component'

export class PickerDurationInput extends Component<'input'> {
  constructor() {
    super({ tag: 'input', className: 'border p-1 w-24 text-center' })

    this.setAttribute('type', 'number')
    this.setAttribute('min', '5')
    this.setAttribute('max', '30')
  }
}
