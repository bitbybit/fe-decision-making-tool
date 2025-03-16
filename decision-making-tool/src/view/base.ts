import { type Router } from '@/router'

export class BaseView {
  protected router?: Router

  public setRouter(router: Router): void {
    this.router = router
  }
}
