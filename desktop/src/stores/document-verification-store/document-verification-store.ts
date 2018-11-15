import { types } from 'mobx-state-tree'
// import { graphql } from 'react-apollo';
// import * as actions from './nav.actions'
// import {PaymentMutation} from '@arcadecity/neon-ui/graphql/stripe/paymentMethodMutation'
/**
 * Handles navigation state
 */

const Payment = types.model({
  id: types.string,
  type: types.string
})

export const DocumentVerificationStoreModel = types
  .model('DocumentVerificationStore')
  .props({
    documentMethod: types.optional(types.array(Payment), []),
    disableFrontFileInput: types.optional(types.boolean, true),
    supportedIDFormats: types.optional(types.string, ''),
    dropDownValue: types.optional(types.string, ''),
    disableBackFileInput: types.optional(types.boolean, false),
    language: types.optional(types.string, ''),
    supportedSelfieFormats: types.optional(types.string, ''),
    
  })
  .actions(self => {
    const actions = {
      onPaymentSelectionChange: (language: string) => {

      },
      handleFrontImgChange: (file: any) => {
        
      },
      handleSelfieImgChange: (file: any) => {
        
      },
      handleBackImgChange: (file: any) => {
        
      },
      handleOpenAlert: (param: any) => {

      },
      closeDocumentVerificationModal: (files: any[]) => {

      }
    }
    return actions
  })

/**
 * An instance of a PaymentStore.
 */
export type DocumentVerificationStore = typeof DocumentVerificationStoreModel.Type

/**
 * The serialized version of a `PaymentStore` often used when acquiring
 * data from an API (for example).
 */
export type DocumentVerificationStoreSnapshot = typeof DocumentVerificationStoreModel.SnapshotType
