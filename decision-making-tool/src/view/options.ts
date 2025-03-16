import { type RouteView } from '@/router'

export class OptionsView implements RouteView {
  public render(): void {
    console.log(this.constructor.name)
  }
}
