import { Component } from '@/ui/component'

export class OptionItemTitleInput extends Component<'input'> {
  constructor({ title }: { title: string }) {
    super({ tag: 'input', className: 'border p-1 flex-grow' })

    this.setAttribute('value', title)
  }
}
