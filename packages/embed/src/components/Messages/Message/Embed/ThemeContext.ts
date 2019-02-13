import styled, { ThemedReactEmotionInterface } from 'react-emotion'
import { Theme } from 'typed-emotion'

import { Embed } from './../../../../types/message.d'

export * from 'typed-emotion'

interface Context extends Theme {
  embed: Embed
}
export default styled as ThemedReactEmotionInterface<Context>
