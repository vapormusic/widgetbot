import { Controller } from '@cerebral/fluent'
import Devtools from 'cerebral/devtools'

import * as app from '../../store'
import { Signals, State } from '../../store/types'

const development =
  process.env.NODE_ENV === 'development' || /localhost/.test(location.host)

const controller = Controller<State, Signals>(app.module, {
  ...(development ? { devtools: Devtools({ host: 'localhost:9000' }) } : {})
})

export default controller

// Debugging
if (window) {
  ;(window as any).controller = controller
  ;(window as any).state = controller.state
  ;(window as any).signals = controller.signals
}
