import { ScrollOverlay } from 'styled-elements/scrollable'
import styled from 'typed-emotion'

interface Props {
  length: number
}

export const Description = styled('div')`
  padding: 5px 17px;
  font-size: 12px;
  text-transform: uppercase;
  line-height: 16px;
  color: ${({ theme }) => theme.colors._primary.fadeOut(0.5).toString()};

  strong {
    text-transform: none;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const Suggestions = styled<Props, any>(ScrollOverlay)`
  position: absolute !important;
  left: 0;
  border-radius: 5px 5px 0 0;
  padding: 8px 0;
  background-color: ${({ theme }) =>
    theme.colors._background.darken(0.05).toString()};
  bottom: ${({ theme }) =>
    theme.url.preset === 'crate' ? `100%` : `calc(100% - 5px)`};

  height: ${({ length }) =>
    (length > 9 ? 300 : length * 32) + 8 * 2 + 26}px !important;
  max-height: calc(100vh - 130px);

  & > div:nth-child(1) {
    padding: 8px 0;
  }
`
