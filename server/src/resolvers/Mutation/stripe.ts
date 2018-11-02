import * as admin from 'firebase-admin'
import { ApolloError, ValidationError } from 'apollo-server-express'
import { pubsub } from '../../'
import * as jwt from 'jsonwebtoken'
import { stripeConfig } from '../../../config'
import * as stripe from 'stripe'
import {userQuery} from '../../constants'
import { CustomerInfo, BadgeType, ThirdPartyAccountType } from '../../models';

const stripeApi = stripe(stripeConfig.stripeSecretKey);

export const creditCard = {
  async savePaymentMethod(_: null, args: CustomerInfo, context) {
    try {
      // const { user } = context
      const { username, tokenID } = args
      const userCollection = await admin
        .firestore()
        .collection('users')
      const userDoc: any = userCollection
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
              let res = userCollection
                .doc(user.uid)
                .set({
                  // TODO: before updating, fetch older thirdparty accounts and extend it.
                  thirdPartyAccounts: [{
                    type: ThirdPartyAccountType.STRIPE,
                    referenceId: customerID
                  }] 
                })
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
