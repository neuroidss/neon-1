import { types, flow } from 'mobx-state-tree'
// import { graphql } from 'react-apollo';
// import * as actions from './nav.actions'
// import {PaymentMutation} from '@arcadecity/neon-ui/graphql/stripe/paymentMethodMutation'
/**
 * Handles navigation state
 */
export const PaymentStoreModel = types
  .model('PaymentStore')
  .props({
    showCreditCardMode: types.optional(types.boolean, false),
    modeOfPayment: types.optional(types.string, ''),
    nameOnCreditCard: types.optional(types.string, '')
  })
  .actions(self => {
    const actions = {
    handleModeOfPayment(value: string) {
      switch (value) {
        case 'CREDIT_CARD':
          self.showCreditCardMode = true
          self.modeOfPayment = value
          break
        default:
          self.showCreditCardMode = false
          self.modeOfPayment = value
      }
    },
    handlePaymentInfo(value: any) {
      self.nameOnCreditCard = value.target.value
    },
    handleCancelPayment(goBack: any) {
      self.showCreditCardMode = false
      self.modeOfPayment = ''
      goBack()
    },
    handleSubmitPayment: flow(function* handleSubmitPayment(stripe: any, goBack: any, PaymentMutation?: any) {          
        const response = yield stripe.createToken({ name: self.nameOnCreditCard })
          const token = response.token
          const cardToken = token && token.id          
          if (cardToken) {
            const paymentResult = yield PaymentMutation({
              variables: {
                customerInfo: {
                  username: 'nitishkohade',
                  tokenID: cardToken
                }
              }
            })
            const isCardSaved = (paymentResult.data && paymentResult.data.savePaymentMethod) || false
            if (isCardSaved) {
              actions.handleCancelPayment(goBack)
            }
          }          
      })
    }
    return actions
  })

/**
 * An instance of a PaymentStore.
 */
export type PaymentStore = typeof PaymentStoreModel.Type

/**
 * The serialized version of a `PaymentStore` often used when acquiring
 * data from an API (for example).
 */
export type PaymentStoreSnapshot = typeof PaymentStoreModel.SnapshotType
