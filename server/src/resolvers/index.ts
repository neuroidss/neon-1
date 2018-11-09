import { lastMessages, message, user } from './Query'
import { creditCard, login, saveUsername, register } from './Mutation'
import { messageAdded } from './Subscription'

export default {
  Query: {
    ...lastMessages,
    ...message
  },
  Mutation: {
    ...creditCard,
    ...login,
    ...saveUsername,
    ...register
  },
  Subscription: {
    ...messageAdded
  }
}
