import Message from './message'

export interface message {
  channel: string
  message: Message
}

export type Subscription = string
