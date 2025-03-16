import { OptionsView } from '@/view/options'
import { PickerView } from '@/view/picker'
import { Router, type Routes, type RouteViews } from '@/router'

type AppParameters = {
  routeViews: RouteViews
}

class App {
  private readonly router: Router

  constructor({ routeViews }: AppParameters) {
    const routes: Routes = Object.fromEntries(
      Object.entries(routeViews).map(([route, routeView]) => {
        const routeViewInstance = new routeView()

        return [
          route,
          (): void => {
            console.log(route)
            routeViewInstance.render()
          }
        ]
      })
    )

    this.router = new Router(routes, () => {
      Object.values(routes)?.[0]?.()
    })
  }
}

const config: AppParameters = {
  routeViews: {
    options: OptionsView,
    picker: PickerView
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    new App(config)
  } catch (error) {
    console.error(error)
  }
})
