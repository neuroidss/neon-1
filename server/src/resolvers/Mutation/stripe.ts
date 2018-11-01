import * as admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'
import { pubsub } from '../../'
import * as jwt from 'jsonwebtoken'
import { stripeConfig } from '../../../config'
import * as stripe from 'stripe'
import {creditCardQuery} from '../../constants'
import { CustomerInfo, BadgeType, ThirdPartyAccountType } from '../../models';

const stripeApi = stripe(stripeConfig.stripeSecretKey);

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
                      type: ThirdPartyAccountType.STRIPE,
                      referenceId: customerID
                    }]
                  },
                  // Do we need it here? or this will happen separately from City app.
                  badges: {
                    connect: [{
                      code: BadgeType.PaymentVerified
                    }]
                  }
                }
              }, creditCardQuery)
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
