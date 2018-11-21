// import { getRoot } from 'mobx-state-tree'
// import { toAmount, toHex, toSatoshis, parseDate, parseSat } from '../../helper'
// import { PAYMENT_TIMEOUT, PREFIX_URI } from '../../config'

/**
 * Attempt to decode a lightning invoice using the lnd grpc api. If it is
 * an invoice the amount and note store values will be set and the lightning
 * transaction fee will also be estimated.
 * @param  {string} options.invoice The input to be validated
 * @return {Promise<boolean>}       If the input is a valid invoice
 */
export async function onPaymentSelectionChange(self, language) {
  try {
    return true
  } catch (err) {
    console.log(`Decoding payment request failed: ${err.message}`)
    return false
  }
}

export async function handleFrontImgChange(self, file) {
  try {
    return true
  } catch (err) {
    console.log(`Decoding payment request failed: ${err.message}`)
    return false
  }
}

export async function handleBackImgChange(self, file) {
  try {
    return true
  } catch (err) {
    console.log(`Decoding payment request failed: ${err.message}`)
    return false
  }
}

export async function handleOpenAlert(self, param) {
  try {
    return true
  } catch (err) {
    console.log(`Decoding payment request failed: ${err.message}`)
    return false
  }
}

export async function closeDocumentVerificationModal(self, files) {
  try {
    return true
  } catch (err) {
    console.log(`Decoding payment request failed: ${err.message}`)
    return false
  }
}

export async function handleSelfieImgChange(self, file) {
  try {
    return true
  } catch (err) {
    console.log(`Decoding payment request failed: ${err.message}`)
    return false
  }
}