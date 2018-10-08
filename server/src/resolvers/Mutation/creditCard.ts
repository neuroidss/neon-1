import * as admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'
import { pubsub } from '../../'
import * as jwt from 'jsonwebtoken'
import { config } from '../../authUtils'
import * as stripe from 'stripe'

const stripeApi = stripe(config.stripeSecretKey);

export const creditCard = {
  async saveCreditCard(_: null, args: { username: string, paymentInfo: any }, context) {
    try {
      // const { user } = context
      const { username } = args
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
            // TODO: token from UI
            source: paymentInfo.tokenID,
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
      return user;
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
