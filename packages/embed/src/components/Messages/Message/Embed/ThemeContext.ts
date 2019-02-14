import styled, { CreateStyled } from '@emotion/styled'
import { Theme } from 'typed-emotion'

import { Embed } from '../../../../types/message'

export * from 'typed-emotion'

interface Context extends Theme {
  embed: Embed
}
export default styled as CreateStyled<Context>
