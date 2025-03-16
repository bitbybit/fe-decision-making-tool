import { Router, type Routes, type RouteView, type RouteViews } from '@/router'
import { Container } from '@/ui/container'

export type AppParameters = {
  routeViews: RouteViews
}

export class App {
  private readonly container: Container
  private readonly routeViews: RouteViews

  constructor({ routeViews }: AppParameters) {
    this.container = new Container()
    document.body.append(this.container.getNode())

    this.routeViews = routeViews
    this.initRouter()
  }

  private initRouteViews(): [keyof Routes, RouteView][] {
    return Object.entries(this.routeViews).map(([route, routeView]) => [route, new routeView()])
  }

  private createRoutes(routeViewInstances: [keyof Routes, RouteView][]): Routes {
    return Object.fromEntries(
      routeViewInstances.map(([route, routeViewInstance]) => [
        route,
        (): void => {
          this.container.getNode().replaceChildren()
          this.container.append(routeViewInstance.container)
        }
      ])
    )
  }

  private initRouter(): void {
    const routeViewInstances = this.initRouteViews()
    const routes = this.createRoutes(routeViewInstances)

    const router = new Router(routes, () => {
      Object.values(routes)?.[0]?.()
    })

    for (const [, routeViewInstance] of routeViewInstances) {
      routeViewInstance.setRouter(router)
    }
  }
}
