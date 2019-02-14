import styled, { CreateStyled } from '@emotion/styled'
import { Theme } from 'typed-emotion'

import Message from '../../../types/message'

export * from 'typed-emotion'

interface Context extends Theme {
  message: Message
}
export default styled as CreateStyled<Context>
