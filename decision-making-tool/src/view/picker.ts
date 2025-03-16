import { type RouteView } from '@/router'
import { Component } from '@/ui/component'
import { BaseView } from '@/view/base'

export class PickerView extends BaseView implements RouteView {
  public readonly container: Component

  constructor() {
    super()

    this.container = new Component({ tag: 'div' })
  }
}
