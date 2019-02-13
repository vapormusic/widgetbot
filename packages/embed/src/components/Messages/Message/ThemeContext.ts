import styled, { ThemedReactEmotionInterface } from 'react-emotion'
import { Theme } from 'typed-emotion'

import Message from '../../../types/message'

export * from 'typed-emotion'

interface Context extends Theme {
  message: Message
}
export default styled as ThemedReactEmotionInterface<Context>
