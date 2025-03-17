import { Component } from '@/ui/component'

export class OptionItemTitleInput extends Component {
  constructor({ title }: { title: string }) {
    super({ tag: 'input', className: 'border p-1 flex-grow', text: title })
  }
}
