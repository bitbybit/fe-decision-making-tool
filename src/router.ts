import { getPath } from '@/util/location'
import { type Component } from '@/ui/component'

export type RouteCallback = () => void

export type Routes = Record<string, RouteCallback>

export type RouteView = {
  container: Component<keyof HTMLElementTagNameMap>
  setRouter(router: Router): void
  onRender?(): void
}

export type RouteViews = Record<keyof Routes, new () => RouteView>

export class Router {
  private readonly routes: Routes
  private readonly defaultRoute: RouteCallback

  constructor(routes: Routes, defaultRoute: RouteCallback) {
    this.routes = routes
    this.defaultRoute = defaultRoute

    this.loadInitialRoute()
    this.bindEvents()
  }

  public navigate(path: string): void {
    if (globalThis.location.hash !== `#${path}`) {
      globalThis.location.hash = path
    }

    const routeCallback = this.routes[path] ?? this.defaultRoute

    routeCallback()
  }

  private handleHashChange(): void {
    this.navigate(getPath())
  }

  private loadInitialRoute(): void {
    this.navigate(getPath())
  }

  private bindEvents(): void {
    globalThis.addEventListener('hashchange', this.handleHashChange.bind(this))
  }
}
