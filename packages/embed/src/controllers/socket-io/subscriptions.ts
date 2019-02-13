import { socket } from 'socket-io'

import { Subscription } from '../../types/socket'
import controller from '../cerebral'

export const subscribe = (channel: Subscription) => {
  socket.emit('subscribe', channel)
  controller.signals.subscribe({ channel })
}

export const unsubscribe = (channel: Subscription) => {
  socket.emit('unsubscribe', channel)
  controller.signals.unsubscribe({ channel })
}
