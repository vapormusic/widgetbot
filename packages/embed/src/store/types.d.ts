import { ComputedValue, Dictionary } from '@cerebral/fluent'

import { Translation } from '../app/locales'
import { Category } from '../types/category'
import Message from '../types/message'
import Modal from '../types/modal'
import { Permissions } from '../types/permissions'
import { ParsedUrl } from '../types/url'
import { User } from '../types/user'
import * as signals from './sequences'

export interface Channel {
  name: string
  category: string
  permissions: Permissions
  lastSeenID: string
  unread: boolean
  topic?: string
  messages?: Dictionary<Message>
}

export type Toggles = 'channels'

export interface Theme {
  colors: {
    primary: string
    accent: string
    background: string
  }
  css: string
  compact: boolean
}

export interface State {
  screen: 'choose-channel' | 'active-channel'
  // Message loading state
  loading: boolean
  // Server info
  server: {
    name: string
    id: string
    memberCount: number
    icon: string
  }

  // Channels that the user is subscribed to
  subscriptions: Dictionary<boolean>

  // Router url
  url: ParsedUrl

  // Array of channels
  channels: Dictionary<Channel>
  // Categorised channels
  categories: ComputedValue<Category[]>

  // Active channel ID
  activeChannel: string
  // Returns the active channel object
  channel: ComputedValue<Channel>

  // Visible UI components
  visible: { [key in Toggles]: boolean }
  // Theme
  theme: Theme

  // Modal
  modal: Modal

  // User
  user: User

  // Translation
  translation: Translation
}

export type Signals = { [key in keyof typeof signals]: typeof signals[key] }
