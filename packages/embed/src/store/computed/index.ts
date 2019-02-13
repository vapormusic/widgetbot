import { State } from '../types'
import Categorise from './categorise'

export function activeChannel(state: State) {
  return state.channels.get(state.activeChannel) || null
}

export function categories(state: State) {
  const channels = state.channels
    .entries()
    .map(([id, data]) => ({ id, ...data }))

  return Categorise(channels)
}
