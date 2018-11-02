import { types } from 'mobx-state-tree'
// import * as actions from './nav.actions'

/**
 * Handles navigation state
 */
export const PaymentStoreModel = types
  .model('PaymentStore')
  .props({
    showCreditCardMode: types.optional(types.boolean, false),
    modeOfPayment: types.optional(types.string, '')
  })
  .actions(self => ({
    handleModeOfPayment (value: string) {
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
    handleCancelPayment (goBack: any) {
      self.showCreditCardMode = false
      self.modeOfPayment = ''
      goBack()
    },
    async handleSubmitPayment (event: any, stripe: any, goBack: any) {
      try{
      event.preventDefault()
      const userName = event.target.name.value
      // !userName && toastMessage('ERROR', CONSTANTS.STRIPE.ERROR_MESSAGES.NAME_ERROR)
      console.log(stripe)
      stripe.createToken({ name: userName }).then(async ({ error, token }) => {
      const cardToken = token && token.id
      const card = token && token.card
      // const { PaymentMutation, SaveUserMutation } = this.props
      // error && toastMessage('ERROR', error.message)
      if (card) {
        if (!card.address_zip) {
          // toastMessage('ERROR', CONSTANTS.STRIPE.ERROR_MESSAGES.POSTAL_CODE_ERROR)
          return
        }
      }
      if (cardToken) {
        // PaymentMutation({
        //   variables: {
        //     customerPaymentInfo: {
        //       // username: this.props.userDetails.username,
        //       tokenID: cardToken
        //     }
        //   }
        // }).then(async (response) => {
        //   if (response && response.data &&
        //     response.data.addCustomerPaymentInfo &&
        //     response.data.addCustomerPaymentInfo.thirdPartyAccounts &&
        //     response.data.addCustomerPaymentInfo.thirdPartyAccounts.length) {
        //     const result = response.data.addCustomerPaymentInfo
        //     await SaveUserMutation({
        //       variables: {
        //         user: {...result}
        //       }
        //     })
        //     // toastMessage('SUCCESS', CONSTANTS.STRIPE.SUCCESS_MESSAGES.PAYMENT_SUCCESS)
        //   }
        // })
      }
    })
    } finally {
      self.showCreditCardMode = false
      self.modeOfPayment = ''
      goBack()
    }
    }
  }))

/**
 * An instance of a PaymentStore.
 */
export type PaymentStore = typeof PaymentStoreModel.Type

/**
 * The serialized version of a `PaymentStore` often used when acquiring
 * data from an API (for example).
 */
export type PaymentStoreSnapshot = typeof PaymentStoreModel.SnapshotType
