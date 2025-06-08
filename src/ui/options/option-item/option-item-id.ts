import { Component } from '@/ui/component'

export class OptionItemId extends Component<'span'> {
  constructor({ id }: { id: string }) {
    super({ tag: 'span', className: 'text-gray-500 w-5', text: id })
  }
}
