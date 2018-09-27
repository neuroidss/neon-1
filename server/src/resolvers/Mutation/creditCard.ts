import admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'
import { pubsub } from '../../'
import * as jwt from 'jsonwebtoken'
import { config } from '../../authUtils'
import * as stripe from 'stripe'

const stripeApi = stripe(config.stripeSecretKey);

export const creditCard = {
  async saveCreditCard(_: null, args: { username: string }, context) {
    try {
      const { user } = context
      const { username } = args
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
      if (userDoc) {
        return new Promise((resolve, reject) => {
          return stripeApi.customers.create({
            description: `Customer for ${userDoc.emailAddress}`,
            source: customerPaymentInfo.tokenID,
            email: userDoc.emailAddress
          }, async function (error, customer) {
            if (error) {
              reject(error)
            }
            try {
              customerID = (customer && customer.id) || null
              const res = customerID && await ctx.db.mutation.updateUser({
                where: { id: userDoc.id },
                data: {
                  thirdPartyAccounts: {
                    create: [{
                      type: 'STRIPE',
                      referenceId: customerID
                    }]
                  },
                  badges: {
                    connect: [{
                      code: 'PaymentVerified'
                    }]
                  }
                }
              }, `{
                        id
                        firstName
                        lastName
                        userType
                        username
                        emailAddress
                        isAuthorized
                        bio
                        phone
                        photo
                        thirdPartyAccounts {
                          id
                          type
                          referenceId
                        }
                        badges {
                          id
                          code
                          name
                        }
                      }`)
              resolve(res)
            }
            catch (error) {
              customerID && stripeApi.customers.del(
                customerID,
                function (err, cust) {
                  reject(error)
                }
              )
              !customerID && reject(error)
            }
          });
        })
      }

      console.log('User from context:', user)
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
