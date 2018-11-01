import * as admin from 'firebase-admin'
import { ValidationError } from 'apollo-server-express'
import * as firebaseRaw from 'firebase'
import * as jwt from 'jsonwebtoken'
import { config } from '../../authUtils'

interface User {
  id: string;
  name: string;
  username: string;
}

export const login = {
  async login(_: null, args: { idToken: string }) {
    // Verify idToken. https://firebase.google.com/docs/auth/admin/verify-id-tokens
    return admin.auth().verifyIdToken(args.idToken)
      .then(async function(decodedToken) {
        let { name, picture, uid, email, firebase } = decodedToken

        // Look up the user by email
        const userDoc = await admin
          .firestore()
          .collection('users')
          .where('email', '==', email)
          .limit(1)
          .get()

        let existingUser, user
        let timestamp = Date.now()

        userDoc.forEach(function (documentSnapshot) {
          existingUser = documentSnapshot.data() as User
          existingUser.id = documentSnapshot.id
        }.bind(this))

        let facebookAddon = firebase.sign_in_provider === 'facebook.com' ? '?type=large' : ''

        // If no database user for this social+email, create one
        if (!existingUser) {

          user = {
            name,
            photo: picture + facebookAddon,
            email,
            id: uid,
            provider: firebase.sign_in_provider
          }

          const newUserDoc = await admin
            .firestore()
            .collection('users')
            .doc(uid)
            .set({
              ...user,
              timestamp
            })

          // TODO: Test that this difference from the existingUser is fine
          return {
            accessToken: jwt.sign(user, config.appSecret, {expiresIn: Date.now() + config.accessTokenExpiryTime}),
            refreshToken: jwt.sign({userId: user.id}, config.appSecret, {expiresIn: Date.now() + config.refreshTokenExpiryTime}),
            user: user
          }
        } else {
          // console.log('existing user ok sure')
          return {
            accessToken: jwt.sign(existingUser, config.appSecret, {expiresIn: Date.now() + config.accessTokenExpiryTime}),
            refreshToken: jwt.sign({userId: existingUser.id}, config.appSecret, {expiresIn: Date.now() + config.refreshTokenExpiryTime}),
            user: existingUser
          }
        }

      }).catch(function(error) {
        console.log('error decoding idToken')
        console.log(error)
      })
  }
}
