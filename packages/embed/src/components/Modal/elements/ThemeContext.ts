import styled, { CreateStyled } from '@emotion/styled'
import { Theme } from 'typed-emotion'

import Modal from '../../../types/modal'

export * from 'typed-emotion'

interface Context extends Theme {
  modal: Modal
}
export default styled as CreateStyled<Context>
