import { connect } from 'fluent'
import * as React from 'react'

import { Count, Icon, Name, Root } from './elements'

export default connect()
  .with(({ state, signals, props }) => ({
    server: state.server
  }))
  .to(({ server }) => {
    const plural = server.memberCount !== 1

    return (
      <Root className="header">
        {server.icon && <Icon src={server.icon} className="icon" />}
        {server.name && <Name className="name">{server.name}</Name>}
        {server.memberCount && (
          <Count
            title={`${server.memberCount} ${
              plural ? 'members' : 'member'
            } in this server`}
            className="count"
          >
            {server.memberCount}
          </Count>
        )}
      </Root>
    )
  })
