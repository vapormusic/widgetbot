import { connect } from 'fluent'
import * as React from 'react'

import { Root } from './elements'
import Hamburger from './Hamburger'

export default connect()
  .with(({ state, signals, props }) => ({
    open: state.visible.channels,
    toggle: () => signals.toggle({ component: 'channels' })
  }))
  .to(({ children, open, toggle }) => (
    <Root className="header">
      <Hamburger onClick={toggle} open={open} />
      {children}
    </Root>
  ))

export { Name, Topic } from './elements'
