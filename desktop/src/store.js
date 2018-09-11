/**
 * @fileOverview the global application store used by mobx for
 * state management. These values are either rendered directly
 * in react components or used as a basis for computed values.
 */

import { extendObservable } from 'mobx';
import ComputedLoaderMsg from './lapp-computed/loader-msg';
import ComputedWallet from './lapp-computed/wallet';
import ComputedTransaction from './lapp-computed/transaction';
import ComputedChannel from './lapp-computed/channel';
import ComputedInvoice from './lapp-computed/invoice';
import ComputedPayment from './lapp-computed/payment';
import ComputedNotification from './lapp-computed/notification';
import ComputedSetting from './lapp-computed/setting';
import ComputedSeed from './lapp-computed/seed';
import { DEFAULT_ROUTE, DEFAULT_UNIT, DEFAULT_FIAT } from './lapp-config';

export class Store {
  constructor() {
    extendObservable(this, {
      loaded: false, // Is persistent data loaded
      unlockerReady: false, // Is wallet unlocker running
      firstStart: false, // Is the first time the app was started
      walletUnlocked: false, // Is the wallet unlocked
      lndReady: false, // Is lnd process running
      syncedToChain: false, // Is lnd synced to blockchain
      percentSynced: 0, // Expects 0-1 range
      route: DEFAULT_ROUTE,
      blockHeight: null,
      balanceSatoshis: 0,
      confirmedBalanceSatoshis: 0,
      unconfirmedBalanceSatoshis: 0,
      pendingBalanceSatoshis: 0,
      channelBalanceSatoshis: 0,
      pubKey: null,
      walletAddress: null,
      displayCopied: false,
      wallet: {
        password: '',
        passwordVerify: '',
        seedVerify: ['', '', ''],
      },
      transactions: [],
      selectedTransaction: null,
      invoices: [],
      invoice: {
        amount: '',
        note: '',
        encoded: '',
        uri: '',
      },
      payments: [],
      payment: {
        address: '',
        amount: '',
        fee: '',
        note: '',
      },
      peers: [],
      channels: [],
      pendingChannels: [],
      selectedChannel: null,
      channel: {
        pubkeyAtHost: '',
        amount: '',
      },
      paymentRequest: null,
      seedMnemonic: [],
      notifications: [],
      logs: '',

      // Persistent data
      settings: {
        unit: DEFAULT_UNIT,
        fiat: DEFAULT_FIAT,
        displayFiat: true,
        exchangeRate: {},
      },
    });
  }

  init() {
    ComputedLoaderMsg(this);
    ComputedWallet(this);
    ComputedTransaction(this);
    ComputedChannel(this);
    ComputedInvoice(this);
    ComputedPayment(this);
    ComputedNotification(this);
    ComputedSetting(this);
    ComputedSeed(this);
  }
}

export default new Store();
