import { getRoot } from 'mobx-state-tree'
import { toAmount, toHex, toSatoshis, parseDate, parseSat } from '../../helper'
import { PAYMENT_TIMEOUT, PREFIX_URI } from '../../config'

/**
 * Attempt to decode a lightning invoice using the lnd grpc api. If it is
 * an invoice the amount and note store values will be set and the lightning
 * transaction fee will also be estimated.
 * @param  {string} options.invoice The input to be validated
 * @return {Promise<boolean>}       If the input is a valid invoice
 */
export async function decodeInvoice(self, invoice) {
  try {
    const settings = { displayFiat: false, unit: 'sat' } // TODO: Tie to store
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const request = await sendCommand('decodePayReq', {
      pay_req: invoice.replace(PREFIX_URI, ''),
    })
    const amount = toAmount(parseSat(request.num_satoshis), settings)
    self.setInvoiceAmount(amount) // Or does this conflict with the other usage and should be different
    self.setInvoiceNote(request.description)
    await self.estimateLightningFee(
      request.destination,
      parseSat(request.num_satoshis)
    )
    return true
  } catch (err) {
    console.log(`Decoding payment request failed: ${err.message}`)
    return false;
  }
}


/**
 * Estimate the lightning transaction fee using the queryRoutes grpc api
 * after which the fee is set in the store.
 * @param  {string} options.destination The lnd node that is to be payed
 * @param  {number} options.satAmt      The amount to be payed in satoshis
 * @return {Promise<undefined>}
 */
export async function estimateLightningFee(self, destination, satAmt) {
  try {
    console.log('in estimateLightningFee, destination is:', destination)
    const settings = { displayFiat: false, unit: 'sat' } // TODO: Tie to store
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const { routes } = await sendCommand('queryRoutes', {
      pub_key: destination,
      amt: satAmt,
      num_routes: 1,
    })
    const fee = toAmount(parseSat(routes[0].total_fees), settings)
    self.setInvoiceFee(fee)
  } catch (err) {
    console.log(`Estimating lightning fee failed!`, err)
  }
  return true
}


/**
 * Read the input values amount and note and generates an encoded
 * payment request via the gprc api. The invoice uri is also set
 * which can be rendered in a QR code for scanning. After the values
 * are set on the store the user is navigated to the invoice QR view
 * which displays the QR for consumption by the payer.
 * The invoice is set private since it should contain a routing hint
 * for private channels.
 * This action can be called from a view event handler as does all
 * the necessary error handling and notification display.
 * @return {Promise<undefined>}
 */
export async function generateUri(self) {
  try {
    const settings = { displayFiat: false, unit: 'sat' } // TODO: Tie to store
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const response = await sendCommand('addInvoice', {
      value: toSatoshis(self.invoiceAmount, settings),
      memo: self.invoiceNote,
      private: true,
    })
    self.setInvoiceEncoded(response.payment_request)
    self.setInvoiceUri(`${PREFIX_URI}${self.invoiceEncoded}`)
  } catch (err) {
    console.log('Creating invoice failed:', err)
    // this._notification.display({ msg: 'Creating invoice failed!', err });
  }
  return true
}


/**
 * List the lightning invoices by calling the respective grpc api and updating
 * the invoices array in the global store.
 * @return {Promise<undefined>}
 */
export async function getInvoices(self) {
  try {
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const { invoices } = await sendCommand('listInvoices');
    const theInvoices = invoices.map(invoice => ({
      id: toHex(invoice.r_hash),
      type: 'lightning',
      amount: parseSat(invoice.value),
      status: invoice.settled ? 'complete' : 'in-progress',
      date: parseDate(invoice.creation_date),
      memo: invoice.memo
    }))
    self.setInvoices(theInvoices)
  } catch (err) {
    console.log('Listing invoices failed', err)
  }
  return true
}


/**
 * List the lightning payments by calling the respective grpc api and updating
 * the payments array in the global store.
 * @return {Promise<undefined>}
 */
export async function getPayments(self) {
  try {
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const { payments } = await sendCommand('listPayments');
    const thePayments = payments.map(payment => ({
      id: payment.payment_hash,
      type: 'lightning',
      amount: -1 * parseSat(payment.value),
      fee: parseSat(payment.fee),
      status: 'complete',
      date: parseDate(payment.creation_date),
    }))
    self.setPayments(thePayments)
  } catch (err) {
    console.log('Listing payments failed', err);
  }
  return true
}


/**
 * List the on-chain transactions by calling the respective grpc api and updating
 * the transactions array in the store.
 * @return {Promise<undefined>}
 */
export async function getTransactions(self) {
  try {
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const { transactions } = await sendCommand('getTransactions')
    const theTransactions = transactions.map(transaction => ({
      id: transaction.tx_hash,
      type: 'bitcoin',
      amount: parseSat(transaction.amount),
      fee: parseSat(transaction.total_fees),
      confirmations: transaction.num_confirmations,
      status: transaction.num_confirmations < 1 ? 'unconfirmed' : 'confirmed',
      date: parseDate(transaction.time_stamp)
    }))
    self.setTransactions(theTransactions)
  } catch (err) {
    console.log('Listing transactions failed', err);
  }
  return true
}


/**
 * Send the specified amount as an on-chain transaction to the provided
 * bitcoin address and display a payment confirmation screen.
 * This action can be called from a view event handler as does all
 * the necessary error handling and notification display.
 * @return {Promise<undefined>}
 */
export async function payBitcoin(self) {
  try {
    // const { payment, settings } = this._store;
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    await sendCommand('sendCoins', {
      addr: self.payAddress,
      amount: toSatoshis(self.payAmount, {displayFiat: false, unit: 'sat'})  // TODO: Tie to store
    })
    // this._nav.goPayBitcoinDone();
  } catch (err) {
    console.log('Sending transaction failed:', err)
    // this._notification.display({ msg: 'Sending transaction failed!', err });
  }
  return true
}


/**
 * Send the amount specified in the invoice as a lightning transaction and
 * display the wait screen while the payment confirms.
 * This action can be called from a view event handler as does all
 * the necessary error handling and notification display.
 * @return {Promise<undefined>}
 */
export async function payLightning(self) {
  let failed = false
  const timeout = setTimeout(() => {
    failed = true
    // this._nav.goPaymentFailed();
    console.log('Payment timed out!')
  }, PAYMENT_TIMEOUT)
  try {
    // this._nav.goWait();
    const root = getRoot(self) as any
    const { sendStreamCommand } = root.lndStore
    const invoice = self.payAddress.replace(PREFIX_URI, '') // TODO Confirm this is the right address
    const stream = await sendStreamCommand('sendPayment')

    await new Promise((resolve, reject) => {
      stream.on('data', data => {
        if (data.payment_error) {
          reject(new Error(`Lightning payment error: ${data.payment_error}`))
        } else {
          resolve()
        }
      })
      stream.on('error', reject)
      stream.write(JSON.stringify({ payment_request: invoice }), 'utf8')
    })
    if (failed) return
    // this._nav.goPayLightningDone();
  } catch (err) {
    console.log('Lightning payment failed!', err)
    if (failed) return;
    // this._nav.goPayLightningConfirm();
    // this._notification.display({ msg: 'Lightning payment failed!', err });
  } finally {
    clearTimeout(timeout);
  }
  return true
}


/**
 * Subscribe to incoming invoice payments using the grpc streaming api.
 * @return {Promise<undefined>}
 */
export async function subscribeInvoices(self) {
  const root = getRoot(self) as any
  const { sendStreamCommand } = root.lndStore
  const stream = await sendStreamCommand('subscribeInvoices')
  await new Promise((resolve, reject) => {
    stream.on('data', () => self.update(self))
    stream.on('end', resolve)
    stream.on('error', reject)
    stream.on('status', status => console.log('Invoices update:', status))
  })
  return true
}


/**
 * Subscribe to incoming on-chain transactions using the grpc streaming api.
 * @return {Promise<undefined>}
 */
export async function subscribeTransactions(self) {
  const root = getRoot(self) as any
  const { sendStreamCommand } = root.lndStore
  const stream = await sendStreamCommand('subscribeTransactions')
  // console.log('stream is', stream)
  await new Promise((resolve, reject) => {
    // console.log('stream is now', stream)
    stream.on('data', () => self.update(self))
    stream.on('end', resolve)
    stream.on('error', reject)
    stream.on('status', status => console.log('Transactions update:', status))
  })
  return true
}

/**
 * Update the on-chain transactions, invoice, and lighting payments in the
 * app state by querying all required grpc apis.
 * @return {Promise<undefined>}
 */
export async function update(self) {
  await Promise.all([
    self.getTransactions(),
    self.getInvoices(),
    self.getPayments()
  ])
  return true
}
