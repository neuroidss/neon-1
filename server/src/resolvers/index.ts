import { lastMessages, message, user } from './Query'
import { addMessage, login, saveUsername } from './Mutation'
import { messageAdded } from './Subscription'

export default {
  Query: {
    ...lastMessages,
    ...message
  },
  Mutation: {
    ...addMessage,
    ...login,
    ...saveUsername
  },
  Subscription: {
    ...messageAdded
  }
}
