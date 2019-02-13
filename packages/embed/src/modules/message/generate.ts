import Message, { Author, MessageType } from '../../types/message'

interface Request {
  message: string
  author: Author
  id?: string
  type?: MessageType
  timestamp?: number
}

const generate = (req: Request): Message => ({
  attachment: null,
  author: req.author,
  content: req.message,
  editedAt: null,
  embeds: [],
  id: req.id || `${+new Date() * Math.random()}`,
  mentions: {
    channels: [],
    members: [],
    roles: [],
    everyone: false
  },
  reactions: [],
  timestamp: req.timestamp || +new Date(),
  type: req.type || 'DEFAULT'
})

export default generate
