import { Component } from '@/ui/component'

export class OptionItemId extends Component {
  constructor({ id }: { id: string }) {
    super({ tag: 'span', className: 'text-gray-500', text: id })
  }
}
