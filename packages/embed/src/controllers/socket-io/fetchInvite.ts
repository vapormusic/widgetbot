import { socket } from 'socket-io'

// Fetch invite
export const fetchInvite = (channel: string) =>
  new Promise<string>((resolve, reject) => {
    let timedOut = false
    const timer = setTimeout(() => {
      reject()
      timedOut = true
    }, 2000)

    socket.emit('invite', { channel }, invite => {
      if (timedOut) return

      clearTimeout(timer)
      if (typeof invite === 'string') {
        resolve(invite)
      } else {
        reject(invite)
      }
    })
  })
