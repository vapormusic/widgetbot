import { Dictionary } from '@cerebral/fluent'

import { Theme } from '../store/types'
import Message from './message'
import { Permissions } from './permissions'

type Channels = {
  name: string
  unread: boolean
  id: string
  category: string
  permissions: Permissions
}[]

export interface Channel {
  name: string
  permissions: Permissions
  topic?: string
  id?: string
  messages?: Dictionary<Message>
}

export interface ChannelResponse {
  server: {
    channel: Channel & { messages: Message[] }
  }
}

export interface ServerResponse {
  server: {
    name: string
    memberCount: number
    icon: string
    theme: Theme
    channels: Channels
    channel?: ChannelResponse['server']['channel']
  }
}
