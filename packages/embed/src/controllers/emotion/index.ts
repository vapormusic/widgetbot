import styled, { ThemedReactEmotionInterface } from 'react-emotion'

import * as Store from '../../store/types'
import { ParsedUrl } from '../../types/url'

export * from 'react-emotion'

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

export default styled as ThemedReactEmotionInterface<Theme>
