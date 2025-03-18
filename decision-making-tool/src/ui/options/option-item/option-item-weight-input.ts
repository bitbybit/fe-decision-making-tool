import { Component } from '@/ui/component'

export class OptionItemWeightInput extends Component<'input'> {
  constructor({ weight }: { weight: string }) {
    super({ tag: 'input', className: 'border p-1 w-15' })

    this.setAttribute('type', 'number')
    this.setAttribute('value', weight)
  }
}
