import { types } from 'mobx-state-tree'
import * as actions from './pay-ln.actions'
import { toAmountLabel, toCaps } from '../../helper'

const Invoice = types.model({
  id: types.string,
  type: types.string,
  amount: types.number,
  status: types.string,
  date: types.Date,
  memo: types.string
})

const Payment = types.model({
  id: types.string,
  type: types.string,
  amount: types.number,
  fee: types.number,
  status: types.string,
  date: types.Date
})

const Transaction = types.model({
  id: types.string,
  type: types.string,
  amount: types.number,
  fee: types.number,
  confirmations: types.number,
  status: types.string,
  date: types.Date
})

/**
 * Handles Lightning payment state
 */
export const PayLnStoreModel = types
  .model('PayLnStore')
  .props({
    invoiceAmount: types.optional(types.string, ''),
    invoiceFee: types.optional(types.string, ''),
    invoiceNote: types.optional(types.string, ''),
    invoiceEncoded: types.optional(types.string, ''),
    invoiceUri: types.optional(types.string, ''),
    invoices: types.optional(types.array(Invoice), []),
    payAddress: types.optional(types.string, ''),
    payAmount: types.optional(types.string, ''),
    payments: types.optional(types.array(Payment), []),
    transactions: types.optional(types.array(Transaction), [])
  })
  .actions(self => ({
    decodeInvoice: async (invoice: string): Promise<boolean> =>
      await actions.decodeInvoice(self, invoice),
    estimateLightningFee: async (destination: string, satAmt: number): Promise<boolean> =>
      await actions.estimateLightningFee(self, destination, satAmt),
    generateUri: async (): Promise<boolean> =>
      await actions.generateUri(self),
    getInvoices: async (): Promise<boolean> =>
      await actions.getInvoices(self),
    getPayments: async (): Promise<boolean> =>
      await actions.getPayments(self),
    getTransactions: async (): Promise<boolean> =>
      await actions.getTransactions(self),
    payBitcoin: async (): Promise<boolean> =>
      await actions.payBitcoin(self),
    payLightning: async (): Promise<boolean> =>
      await actions.payLightning(self),
    subscribeInvoices: async (): Promise<boolean> =>
      await actions.subscribeInvoices(self),
    subscribeTransactions: async (): Promise<boolean> =>
      await actions.subscribeTransactions(self),
    update: async (): Promise<boolean> =>
      await actions.update(self),
    /** Basic setters */
    setInvoiceAmount (value: string) {
      self.invoiceAmount = value
    },
    setInvoiceFee (value: string) {
      self.invoiceFee = value
    },
    setInvoiceNote (value: string) {
      self.invoiceNote = value
    },
    setInvoiceEncoded (value: string) {
      self.invoiceEncoded = value
    },
    setInvoiceUri (value: string) {
      self.invoiceUri = value
    },
    setInvoices (value: any) {
      self.invoices = value
    },
    setPayAddress (value: string) {
      self.payAddress = value
    },
    setPayAmount (value: string) {
      self.payAmount = value
    },
    setPayments (value: any) {
      self.payments = value
    },
    setTransactions (value: any) {
      self.transactions = value
    }
  }))
  .views(self => ({
    get computedTransactions() {
      const settings = { displayFiat: false, unit: 'sat' } // TODO: Tie to store
      const t = self.transactions ? self.transactions.slice() : []
      const p = self.payments ? self.payments.slice() : []
      const i = self.invoices ? self.invoices.slice() : []
      const all = [].concat(t, p, i)
      all.sort((a, b) => b.date.getTime() - a.date.getTime())
      all.forEach(t => {
        t.idName = t.type === 'bitcoin' ? 'Transaction ID' : 'Invoice ID'
        t.typeLabel = toCaps(t.type)
        t.statusLabel = toCaps(t.status)
        t.dateLabel = t.date.toLocaleDateString()
        t.dateTimeLabel = t.date.toLocaleString()
        t.amountLabel = toAmountLabel(t.amount, settings)
        t.feeLabel = Number.isInteger(t.fee)
          ? toAmountLabel(t.fee, settings)
          : '-'
        if (Number.isInteger(t.confirmations)) {
          t.confirmationsLabel = t.confirmations.toString();
        }
      })
      return all.slice(0, 100)
    }
  }))

/**
 * An instance of a PayLnStore.
 */
export type PayLnStore = typeof PayLnStoreModel.Type

/**
 * The serialized version of a `PayLnStore` often used when acquiring
 * data from an API (for example).
 */
export type PayLnStoreSnapshot = typeof PayLnStoreModel.SnapshotType
