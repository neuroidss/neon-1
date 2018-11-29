import { types } from 'mobx-state-tree'
import { onPaymentSelectionChange, handleBackImgChange, handleFrontImgChange, handleOpenAlert, handleSelfieImgChange, closeDocumentVerificationModal } from './evident-document-verification.actions'
// import { graphql } from 'react-apollo';
// import * as actions from './nav.actions'
// import {PaymentMutation} from '@arcadecity/neon-ui/graphql/stripe/paymentMethodMutation'

const Payment = types.model({
  id: types.string,
  type: types.string
})

const UploadData = types.model({
  id_type: types.string,
  selfieImageData: types.string,
  frontImageData: types.string,
  backImageData: types.string,
  selfieImageType: types.string,
  selfieImageDataSize: types.string,
  frontImageType: types.string,
  frontImageDataSize: types.string,
  backImageType: types.string
})

export const EvidentDocumentVerificationStoreModel = types
  .model('EvidentDocumentVerificationStore')
  .props({
    documentMethod: types.optional(types.array(Payment), []),
    disableFrontFileInput: types.optional(types.boolean, true),
    supportedIDFormats: types.optional(types.string, ''),
    dropDownValue: types.optional(types.string, ''),
    disableBackFileInput: types.optional(types.boolean, false),
    uploadedData: types.optional(types.map(UploadData), {})
  })
  .actions(self => {
    const actions = {
      onPaymentSelectionChange: async (language: string) => 
        await onPaymentSelectionChange(self, language),
      handleFrontImgChange: async (file: any) => 
        await handleFrontImgChange(self, file),
      handleSelfieImgChange: async (file: any) =>
        await handleSelfieImgChange(self, file),
      handleBackImgChange: async (file: any) => 
        await handleBackImgChange(self, file),
      handleOpenAlert: async (param: any) => 
        await handleOpenAlert(self, param),
      closeDocumentVerificationModal: async (files: any[]) =>
        await closeDocumentVerificationModal(self, files),
      /** Basic setters */
      setDisableFrontFileInput (value: boolean) {
        self.disableFrontFileInput = value
      },
      setDropDownValue (value: string) {
        self.dropDownValue = value
      },
      setDisableBackFileInput (value: boolean) {
        self.disableBackFileInput = value
      },
      setUploadedData (uploadedData: any) {
        self.uploadedData = uploadedData
      }
    }
    return actions
  })

/**
 * An instance of a EvidentDocumentVerificationStore.
 */
export type EvidentDocumentVerificationStore = typeof EvidentDocumentVerificationStoreModel.Type

/**
 * The serialized version of a `EvidentDocumentVerificationStore` often used when acquiring
 * data from an API (for example).
 */
export type EvidentDocumentVerificationStoreSnapshot = typeof EvidentDocumentVerificationStoreModel.SnapshotType
