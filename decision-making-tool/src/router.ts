import { getPath } from '@/util/location'

export type RouteCallback = () => void
export type Routes = Record<string, RouteCallback>
export type RouteView = { render(): void }
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
