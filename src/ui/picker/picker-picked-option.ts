import { Component } from '@/ui/component'

export class PickerPickedOption extends Component<'div'> {
  constructor() {
    super({ tag: 'div', className: 'text-xl text-center p-2', text: 'Press "Pick" to start the decision process' })
  }
}
