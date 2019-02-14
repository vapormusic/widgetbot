import styled, { CreateStyled } from '@emotion/styled'
import * as Store from '../../store/types'
import { ParsedUrl } from '../../types/url'

type Color = any

export interface Theme extends Store.Theme {
  colors: {
    _primary: Color
    _accent: Color
    _background: Color

    primary: string
    accent: string
    background: string
  }
  url: ParsedUrl
}

export default styled as CreateStyled<Theme>
