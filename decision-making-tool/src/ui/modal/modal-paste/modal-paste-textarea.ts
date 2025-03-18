import { Component } from '@/ui/component'

export class ModalPasteTextarea extends Component<'textarea'> {
  constructor() {
    super({ tag: 'textarea', className: 'w-full p-2 border flex-grow font-mono', text: '' })

    this.setAttribute(
      'placeholder',
      `Paste a list of new options in a CSV-like format:

title,1                 -> | title                 | 1 |
title with whitespace,2 -> | title with whitespace | 2 |
title , with , commas,3 -> | title , with , commas | 3 |
title with "quotes",4   -> | title with "quotes"   | 4 |`
    )
  }
}
