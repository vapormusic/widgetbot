import { connect } from 'fluent'
import Notifications from 'notify'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import initiate from 'socket-io'

import Channels from '../components/Channels'
import Messages from '../components/Messages'
import Modal from '../components/Modal'
import ChooseChannel from '../components/Overlays/ChooseChannel'

// SocketIO
export default connect()
  .with(({ state, signals, props }) => ({
    screen: state.screen,
    locale: state.url.lang,
    translation: state.translation
  }))
  .toClass(
    props =>
      class App extends React.PureComponent<typeof props> {
        componentDidMount() {
          initiate()
        }

        render() {
          const { screen, locale, translation } = this.props

          return (
            <IntlProvider
              locale={locale}
              messages={translation}
              textComponent={React.Fragment}
            >
              <React.Fragment>
                <Modal />
                <Notifications />
                <Channels />
                {screen === 'active-channel' && <Messages />}
                {screen === 'choose-channel' && <ChooseChannel />}
              </React.Fragment>
            </IntlProvider>
          )
        }
      }
  )
