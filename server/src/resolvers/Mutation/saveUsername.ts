import admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'
import { pubsub } from '../../'
import * as jwt from 'jsonwebtoken'
import { config } from '../../authUtils'

export const saveUsername = {
  async saveUsername(_: null, args: { username: string }, context) {
    try {
      const { user } = context
      const { username } = args
      console.log('User from context:', user)

      const userDoc = await admin
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .limit(1)
        .get()

      let checkUser
      userDoc.forEach(function (documentSnapshot) {
        checkUser = documentSnapshot.data()
        checkUser.id = documentSnapshot.id
      }.bind(this))

      if (checkUser) {
        console.log('User ' + user.email + ' tried to claim ' + username + ', but it is taken')
        return false
      } else {
        admin.firestore().doc(`users/${user.id}`).update({ username })  // TODO: add auth
        console.log('User ' + user.email + ' successfully claimed username: ' + username)
        return true
      }

    } catch(error) {
      throw new ApolloError(error)
    }
  }
}
