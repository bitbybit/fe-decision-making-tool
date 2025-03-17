import { Component } from '@/ui/component'

export class OptionItemWeightInput extends Component {
  constructor({ weight }: { weight: string }) {
    super({ tag: 'input', className: 'border p-1 w-15', text: weight })

    this.getNode().setAttribute('type', 'number')
  }
}
