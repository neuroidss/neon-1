import * as admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'
import { pubsub } from '../../'

export const addMessage = {
  async addMessage(_: null, args: { id: string, text: string, timestamp: number, user: any, roomName: string }) {
    try {
      args.timestamp = Date.now()
      const messageDoc = await admin
        .firestore()
        .collection('messages')
        .add({ text: args.text, timestamp: args.timestamp, user: args.user, roomName: args.roomName })
      args.id = messageDoc.id
      pubsub.publish('MESSAGE_ADDED', { messageAdded: args })
      return {
        id: messageDoc.id,
        text: args.text,
        user: args.user,
        roomName: args.roomName,
        timestamp: args.timestamp
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
