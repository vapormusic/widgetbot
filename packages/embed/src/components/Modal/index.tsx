import { ThemeProvider } from 'emotion-theming'
import { connect } from 'fluent'
import * as React from 'react'

import About from './About'
import Authenticate from './Authenticate'
import { Sam, Voakie } from './Developer'
import { Box, Close, Image, OpenImage, Root } from './elements'

export default connect()
  .with(({ state, signals, props }) => ({
    modal: state.modal,
    toggle: signals.modal
  }))
  .toClass(
    props =>
      class Modal extends React.PureComponent<typeof props> {
        state = {
          open: this.props.modal.open
        }
        timer

        componentWillReceiveProps(nextProps) {
          const { open } = nextProps.modal
          if (open) {
            this.setState({ open })
          } else {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => this.setState({ open }), 100)
          }
        }

        theme = theme => ({
          ...theme,
          modal: this.props.modal
        })

        content = () => {
          const { modal } = this.props

          if (modal.type === 'authenticate') {
            return <Authenticate />
          }

          if (modal.type === 'image') {
            return (
              <React.Fragment>
                <Image src={modal.data} />
                <OpenImage
                  href={modal.data}
                  target="_blank"
                  onClick={this.close.bind(this)}
                >
                  Open original
                </OpenImage>
              </React.Fragment>
            )
          }

          if (modal.type === 'about') {
            return <About />
          }

          if (modal.type === 'developer') {
            return modal.data === 'voakie' ? <Voakie /> : <Sam />
          }

          return null
        }

        render() {
          return (
            <ThemeProvider theme={this.theme.bind(this)}>
              <Root
                onClick={e =>
                  e.target === e.currentTarget ? this.close() : null
                }
                className="modal"
              >
                <Box className="box">
                  <Close onClick={this.close.bind(this)} className="close" />
                  {this.state.open && <this.content />}
                </Box>
              </Root>
            </ThemeProvider>
          )
        }

        componentDidMount() {
          window.addEventListener('keydown', this.listener)
        }

        componentWillUnmount() {
          window.removeEventListener('keydown', this.listener)
        }

        listener = ({ keyCode }) => {
          const { modal } = this.props

          if (modal.open) {
            switch (keyCode) {
              case 27:
                this.close()
            }
          }
        }

        close() {
          const { toggle } = this.props

          toggle({
            open: false
          })
        }
      }
  )
