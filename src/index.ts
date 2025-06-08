import { OptionsView } from '@/view/options'
import { PickerView } from '@/view/picker'
import { App, type AppParameters } from '@/app'

const config: AppParameters = {
  routeViews: {
    '/options': OptionsView,
    '/picker': PickerView
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    new App(config)
  } catch (error) {
    console.error(error)
  }
})
