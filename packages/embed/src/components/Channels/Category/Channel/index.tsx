import * as React from 'react'

import { Hashtag, Name, Pings, Root } from './elements'

interface Props {
  name: string
  unread: boolean
  id: string
  order: number
  selected: boolean
}

class Channel extends React.PureComponent<Props> {
  name: HTMLDivElement

  componentDidMount() {
    const { selected } = this.props

    if (selected && this.name) {
      // this.name.scrollIntoView()
    }
  }

  render() {
    const { name } = this.props

    return (
      <Root {...this.props} className="channel">
        <Hashtag className="hash" />
        <Name innerRef={ref => (this.name = ref)} className="name">
          {name}
        </Name>
        {false && <Pings className="pings">1</Pings>}
      </Root>
    )
  }
}

export default Channel
