import Crate from '../../src'

const crate = new Crate({
  server: 'YOUR-SERVER-ID',
  channel: 'YOUR-CHANNEL-ID',
  shard: 'http://localhost:3000',
  // glyph: ['https://samdd.me/favicon.ico', '50%'],
  css: `
  &:not(.open) .button {
    background: blue;
    &:hover {
      background: red;
    }
  }
`
  // defer: true
})

crate.on('signIn', user => {
  console.log(user)
  crate.emit('sendMessage', 'Testing')
})
