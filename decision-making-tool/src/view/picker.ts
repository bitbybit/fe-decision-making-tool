import { type RouteView } from '@/router'

export class PickerView implements RouteView {
  public render(): void {
    console.log(this.constructor.name)
  }
}
