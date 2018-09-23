import admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'

interface User {
  id: string;
  name: string;
  username: string;
}

export const user = {
  async user(_: null, args: { id: string }) {
    try {
      const userDoc = await admin
        .firestore()
        .doc(`users/${args.id}`)
        .get();
      const user = userDoc.data() as User | undefined;
      return user || new ValidationError('User ID not found');
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}

export const userByEmail = {
  async userByEmail(_: null, args: { email: string }) {
    try {
      const userDoc = await admin
        .firestore()
        .collection('users')
        .where('email', '==', args.email)
        .limit(1)
        .get()
      let user
      userDoc.forEach(function (documentSnapshot) {
        user = documentSnapshot.data() as User
        user.id = documentSnapshot.id
      }.bind(this))
      return user || new ValidationError('User with email ' + args.email + ' not found')
    } catch(error) {
      throw new ApolloError(error)
    }
  }
}

export const usernameExists = {
  async usernameExists(_: null, args: { username: string }) {
    try {
      const userDoc = await admin
        .firestore()
        .collection('users')
        .where('username', '==', args.username)
        .limit(1)
        .get()

      let user
      userDoc.forEach(function (documentSnapshot) {
        user = documentSnapshot.data()
        user.id = documentSnapshot.id
      }.bind(this))

      if (user) {
        console.log('Username ' + args.username + ' is taken! Please choose another')
        // TODO: Reset the ?
        return 'taken'
      } else {
        console.log('Username ' + args.username + ' is available')
        return 'available'
      }

    } catch(error) {
      throw new ApolloError(error)
    }
  }
}
