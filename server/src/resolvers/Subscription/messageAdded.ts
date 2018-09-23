import { pubsub } from '../../'
import { withFilter } from 'graphql-subscriptions'

export const messageAdded = {
  messageAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(['MESSAGE_ADDED']),
      (payload, variables) => {
        return payload.messageAdded.roomName === variables.roomName
      }
    )
  }
}
