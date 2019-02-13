import Message from '../../types/message'

export const getLast = (messages: Message[]) => {
  const lastMessage = messages.slice(-1).pop()
  return lastMessage ? lastMessage.id : null
}
