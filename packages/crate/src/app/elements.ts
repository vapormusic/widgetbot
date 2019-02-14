import styled from '@emotion/styled'

export const Root = styled.div`
  transition: opacity 0.2s ease;
  opacity: ${props => (props.theme.visible ? 1 : 0)};
  pointer-events: ${props => !props.theme.visible && 'none'};

  & :not(svg|*) {
    all: unset;
  }

  & * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
`
