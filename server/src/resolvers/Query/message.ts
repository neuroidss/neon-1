import admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'

interface Message {
  id: string;
  text: string;
}

export const message = {
  async message(_: null, args: { id: string }) {
    try {
      const messageDoc = await admin
        .firestore()
        .doc(`messages/${args.id}`)
        .get()
      const message = messageDoc.data() as Message | undefined
      return message || new ValidationError('Message ID not found')
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}

// Pull the last X messages
export const lastMessages = {
  async lastMessages(_: null, args: { last: number }) {
    try {
      const querySnapshot = await admin
        .firestore()
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(args.last)
        .get()
      return querySnapshot.docs.map(function (documentSnapshot) {
        return documentSnapshot.data();
      }) || new ValidationError('Unknown error fetching last messages')
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
