import { connect } from 'fluent'
import * as React from 'react'

import { Wrapper } from './elements'

export default connect()
  .with(({ state, signals, props }) => ({
    channelsOpen: state.visible.channels,
    toggle: () => signals.toggle({ component: 'channels' })
  }))
  .to(({ children, channelsOpen, toggle }) => (
    <Wrapper
      onClick={() => {
        if (channelsOpen && window.innerWidth < 520) {
          toggle()
        }
      }}
      squashed={channelsOpen}
      className="wrapper"
    >
      {children}
    </Wrapper>
  ))
