import { BranchContext, Context } from 'fluent'
import { Locales, translations } from 'locales'
import * as _ from 'lodash'
import Log from 'logger'
import enrich from 'markdown/enrich'
import { addNotification } from 'notify'
import { Notification } from 'react-notification-system'
import { socket } from 'socket-io'

import controller from '../../controllers/cerebral'
import generate from '../../modules/message/generate'
import { Reaction } from '../../types/message'
import Modal from '../../types/modal'
import { message } from '../../types/socket'
import { ParsedUrl, RawUrl } from '../../types/url'
import { User } from '../../types/user'
import { Toggles } from '../types'
import { State } from './../types'
import { getLast } from './util'

/**
 * Selects a server (and or) channel and returns a branch
 * from whether the selected server / channel is already cached
 */
export function select({
  state,
  props,
  path
}: BranchContext<
  {
    cached: boolean
    uncached: boolean
  },
  RawUrl
>) {
  let cached = false

  // Mark all messages as read on the current channel
  if (state.activeChannel) {
    const channel = state.channel.get()

    if (channel && channel.messages) {
      channel.lastSeenID = getLast(channel.messages.values())
    }
  }

  // If the server field has an icon entry, it's cached
  if (props.server) {
    state.server.id = props.server
    cached = !!state.server.icon
  }

  // Marks a channel as selected
  // If the channels array contains the selected channel ID
  // and contains the messages field, then it's cached
  if (props.channel) {
    state.activeChannel = props.channel

    const channel = state.channels.get(props.channel)
    if (channel && channel.messages) {
      // Remove unread indicator
      channel.unread = false

      cached = true
    } else {
      cached = false
    }
  }

  Log('warn', `Selected`, props, cached ? `from cache` : `from network`)
  return cached ? path.cached(true) : path.uncached(true)
}

/**
 * Router
 */
export function routed({ state, props, storage }: Context<RawUrl>) {
  state.url = {
    lang: 'en'
  }

  if (props.width && !isNaN(+props.width)) {
    state.url.width = +props.width
  }

  if (props.height && !isNaN(+props.height)) {
    state.url.height = +props.height
  }

  if (props.lang) {
    if (Object.keys(translations).indexOf(props.lang) !== -1) {
      const lang = props.lang as Locales
      state.url.lang = lang
      state.translation = translations[lang]
    } else {
      console.error(
        `"${props.lang}" is not a valid / translated locale! falling back to EN`
      )
    }
  }

  if (props.token) {
    state.url.token = props.token
  }

  if (props.api) {
    state.url.api = props.api
  }

  if (props.preset && /^crate$/.test(props.preset)) {
    state.url.preset = props.preset as ParsedUrl['preset']
  }
}

/**
 * Message actions
 */
export function setMessage({ state, props }: Context<message>) {
  const channel = state.channels.get(props.channel)

  if (channel && channel.messages) {
    channel.messages.set(props.message.id, props.message)

    // Unread indicators
    if (props.channel === state.activeChannel) {
      channel.lastSeenID = props.message.id
    }

    if (props.channel !== state.activeChannel) {
      channel.unread = true
    }
  }
}

export function deleteMessage({
  state,
  props
}: Context<{ channel: string; id: string }>) {
  const channel = state.channels.get(props.channel)

  if (channel && channel.messages) {
    channel.messages.delete(props.id)
  }
}

export function deleteMessageBulk({
  state,
  props
}: Context<{ channel: string; ids: string[] }>) {
  const channel = state.channels.get(props.channel)

  if (channel && channel.messages) {
    props.ids.forEach(id => channel.messages.delete(id))
  }
}

export function sendMessage({
  state,
  props,
  path
}: BranchContext<{ sending: message }, { channel: string; message: string }>) {
  const payload = {
    ...props,
    message: enrich(props.message)
  }
  const { channel } = payload

  const id = _.times(20, () => _.random(9)).join('')

  socket.emit('sendMessage', payload, () => {
    controller.signals.deleteMessage({ channel, id })
  })

  return path.sending({
    channel,
    message: generate({
      author: {
        name: state.user.name,
        avatar: state.user.avatar,
        id: state.user.id,
        type: state.user.type,
        roles: null,
        color: '#000000'
      },
      id,
      message: payload.message,
      type: 'SENDING'
    })
  })
}

/**
 * Socket.io
 */
export function subscribe({
  state,
  props
}: Context<{
  channel: string
}>) {
  state.subscriptions.set(props.channel, true)
}

export function unsubscribe({
  state,
  props
}: Context<{
  channel: string
}>) {
  state.subscriptions.delete(props.channel)
}

/**
 * Reactions
 */
export function messageReactionAdd({
  state,
  props
}: Context<{
  channel: string
  id: string
  reaction: Reaction
}>) {
  const channel = state.channels.get(props.channel)

  if (channel && channel.messages) {
    const message = channel.messages.get(props.id)
    if (message) {
      if (!message.reactions) message.reactions = []

      const sameReaction = message.reactions.find(
        r => r.id === props.reaction.id && r.name === props.reaction.name
      )

      if (sameReaction) {
        sameReaction.count = props.reaction.count
      } else {
        message.reactions.push(props.reaction)
      }
    }
  }
}

export function messageReactionRemove({
  state,
  props
}: Context<{
  channel: string
  id: string
  reaction: Reaction
}>) {
  const channel = state.channels.get(props.channel)

  if (channel && channel.messages) {
    const message = channel.messages.get(props.id)
    if (message && message.reactions) {
      message.reactions = message.reactions.filter(
        r => !(r.id === props.reaction.id && r.name === props.reaction.name)
      )
    }
  }
}

/**
 * Authentication actions
 */
let resolvees: Function[] = []
export async function signUp({
  state,
  props,
  path
}: BranchContext<{
  complete: {
    user: User
  }
  interrupted: {
    error: string
  }
}>) {
  if (state.user.name) return path.complete({ user: state.user })

  state.modal = {
    ...state.modal,
    open: true,
    type: 'authenticate'
  }

  // The position in the resolvees array
  let que: number

  let timer
  try {
    // Become a resolvee for once the user is signed in
    // Execution is gracefully stopped until this is complete
    const user = (await new Promise((resolve, reject) => {
      que = resolvees.push(resolve) - 1

      // Check to make sure the user hasn't closed the dialog
      timer = setInterval(() => {
        if (!state.modal.open || state.modal.type !== 'authenticate') {
          // If they've closed it, reject the promise and go down
          // the interrupted path
          reject(`You need to sign in to send messages`)
        }
      }, 500)
    })) as User

    clearInterval(timer)

    return path.complete({ user })
  } catch (error) {
    clearInterval(timer)

    // Remove the resolver from the resolvees array
    resolvees.splice(que, 1)

    // User declined to sign in /
    // Something went wrong
    return path.interrupted({ error })
  }
}

export function createAccount({
  state,
  storage,
  props
}: Context<{ name: string }>) {
  socket.emit('signUp', props)
}

export function signIn({ state, props, storage }: Context<User>) {
  const { name, avatar, id, token, type } = props

  state.user = { ...state.user, name, avatar, id, token, type }

  // Set token
  storage.set('token', token)

  // Resolve resolvee sequences
  if (resolvees.length) {
    resolvees.forEach(resolve => resolve(state.user))
  }
}

export function singleSignOn({ state, props }: Context) {
  console.log('single sign on')
}

/**
 * General actions
 */
export function notify({
  state,
  props
}: Context<{ notification: Notification | Notification[] }>) {
  addNotification(props.notification)
}

export const loading = (status: boolean) => ({ state, props }: Context) => {
  state.loading = status
}

/**
 * Interactive actions
 */
export function closeDrawerOnMobile({ state, props }: Context) {
  if (window.innerWidth < 520) {
    state.visible.channels = false
  }
}

export function toggle({ state, props }: Context<{ component: Toggles }>) {
  state.visible[props.component] = !state.visible[props.component]
}

export function modal({
  state,
  props
}: Context<{ open: boolean; type?: Modal['type']; data?: Modal['data'] }>) {
  state.modal = { ...state.modal, ...props }
}

export function switchScreen(screen: State['screen']) {
  return ({ state, props }: Context) => {
    state.screen = screen
  }
}

export function typing({
  state,
  props
}: Context<{ channel: string; typing: boolean }>) {
  socket.emit('typing', props)
}

export { default as GraphQL } from './graphql'
