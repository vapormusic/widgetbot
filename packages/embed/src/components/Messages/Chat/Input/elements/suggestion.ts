import { Twemoji } from 'emoji'
import { css } from 'emotion'
import styled from 'typed-emotion'

interface Props {
  selected: boolean
}

export const Suggestion = styled.li<Props>`
  display: flex;
  cursor: pointer;
  height: 32px;
  margin: 0 8px;
  font-size: 14px;
  line-height: 16px;
  border-radius: 3px;
  padding: 8px;
  ${({ selected, theme }) =>
    selected
      ? css`
          background-color: ${theme.colors._primary.fadeOut(0.95).toString()};
        `
      : null};
`

export const Icon = styled(Twemoji)`
  width: 16px;
  height: 16px;
  text-align: center;
`

export const Name = styled.div`
  margin-left: 10px;
`
