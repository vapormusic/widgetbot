import * as React from 'react'

import {
  Bio,
  Card,
  Chip,
  Description,
  Graph,
  Heading,
  Mugshot,
  Root
} from '../elements'

class Developer extends React.PureComponent {
  render() {
    return (
      <Card>
        <Root>
          <Mugshot src="https://voakie.com/favicon/android-icon-192x192.png" />
          <Bio>
            <Heading>Voakie</Heading>
            <Description>{`I am the founder of WidgetBot.io`}</Description>

            <Chip href="https://github.com/voakie" target="_blank">
              GitHub
            </Chip>
            <Chip href="https://twitter.com/djvoax" target="_blank">
              Twitter
            </Chip>
            <Chip href="https://voakie.com" target="_blank">
              Website
            </Chip>
            <Chip
              // href="/channels/33583637603142818/339910176956219403/"
              href="https://discord.gg/zyqZWr2"
              target="_blank"
            >
              Discord
            </Chip>
          </Bio>
        </Root>
        <Graph
          username="voakie"
          onClick={() => window.open('https://github.com/voakie')}
        />
      </Card>
    )
  }
}

export default Developer
