import { AuthorTypes } from './message'

export interface User {
  name: string
  avatar: string
  id: string
  token: string
  type: AuthorTypes
}
