import { Twemoji } from 'emoji'
import Down from 'react-icons/lib/fa/angle-down'
import Right from 'react-icons/lib/fa/angle-right'
import styled from 'typed-emotion'

export const Root = styled('div')`
  padding-top: 20px;
`

export const Name = styled('div')`
  height: 20px;
  display: flex;
  color: ${({ theme }) => theme.colors._primary.fadeOut(0.6).toString()};
  margin: 2px 8px;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
  transition: color 0.1s ease;

  &:hover {
    color: ${({ theme }) => theme.colors._primary.fadeOut(0.3).toString()};
  }
`

export const Text = styled('span')`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: inherit;
`

export const Emoji = styled(Twemoji)`
  width: 13px !important;
  height: 100% !important;
  margin-right: 2px !important;
`

export const Collapse = styled(Down)`
  flex-shrink: 0;
  height: 20px;
  width: 20px;
  padding: 4px;
  color: inherit;
  & * {
    color: inherit;
  }
`

export const Expand = Collapse.withComponent(Right)
