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
    handleCancelPayment () {
      self.showCreditCardMode = false
      self.modeOfPayment = ''
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
