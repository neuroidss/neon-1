import * as admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'
import { pubsub } from '../../'
import * as jwt from 'jsonwebtoken'
import { config } from '../../authUtils'
import * as stripe from 'stripe'

const stripeApi = stripe(config.stripeSecretKey);

export const creditCard = {
  async saveCreditCard(_: null, args: CustomerInfo, context) {
    try {
      // const { user } = context
      const { username, tokenID } = args
      const userDoc = await admin
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .limit(1)
        .get()
      let user
      userDoc.forEach(function (documentSnapshot) {
        user = documentSnapshot.data()
        user.id = documentSnapshot.id
      }.bind(this))

      if (user) {
        return new Promise((resolve, reject) => {
          return stripeApi.customers.create({
            // TODO: check user emailAddress
            description: `Customer for ${user.emailAddress}`,
            source: tokenID,
            email: user.emailAddress
          }, async function (error, customer) {
            let customerID
            if (error) {
              reject(error)
            }
            try {
              customerID = (customer && customer.id) || null
              const res = customerID && await context.db.mutation.updateUser({
                where: { id: user.id },
                data: {
                  thirdPartyAccounts: {
                    create: [{
                      type: 'STRIPE',
                      referenceId: customerID
                    }]
                  },
                  // Do we need it here? or this will happen separately from City app.
                  badges: {
                    connect: [{
                      code: 'PaymentVerified'
                    }]
                  }
                }
              }, `{
                id
                fbid
                name
                photo
                email
                link
                firebaseId
                providerId
                username
                role
                bio
                thirdPartyAccounts {
                  id
                  type
                  referenceId
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
      return true;
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
