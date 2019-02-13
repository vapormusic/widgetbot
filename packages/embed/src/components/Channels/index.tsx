import { connect } from 'fluent'
import * as React from 'react'

import Category from './Category'
import { Categories, Root } from './elements'
import Header from './Header'
import Panel from './Panel'

export default connect()
  .with(({ state, signals, props }) => ({
    categories: state.categories.get(),
    activeChannel: state.activeChannel,
    visible: state.visible.channels
  }))
  .toClass(
    props =>
      class Channels extends React.PureComponent<typeof props> {
        render() {
          const { visible, categories, activeChannel } = this.props

          return (
            <Root visible={visible} className="channels">
              <Header />
              <Categories>
                {categories.map((category, i) => (
                  <Category
                    key={i}
                    {...{
                      category,
                      activeChannel
                    }}
                  />
                ))}
              </Categories>
              <Panel />
            </Root>
          )
        }
      }
  )
