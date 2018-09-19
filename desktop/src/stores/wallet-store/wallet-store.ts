import { types } from 'mobx-state-tree'
import * as actions from './wallet.actions'

/**
 * Handles wallet state
 */
export const WalletStoreModel = types
  .model('WalletStore')
  .props({
    address: types.optional(types.string, ''),
    balanceSatoshis: types.optional(types.number, 0),
    balanceConfirmedSatoshis: types.optional(types.number, 0),
    balancePendingSatoshis: types.optional(types.number, 0),
    balanceUnconfirmedSatoshis: types.optional(types.number, 0),
    channelBalanceSatoshis: types.optional(types.number, 0),
    channelPendingBalanceSatoshis: types.optional(types.number, 0),
    firstStart: types.optional(types.boolean, false),
    password: types.optional(types.string, ''),
    passwordVerify: types.optional(types.string, ''),
    pubKey: types.optional(types.string, ''),
    seedMnemonic: types.optional(types.array(types.string), []),
    seedVerify: types.optional(types.array(types.string), []),
    syncedToChain: types.optional(types.boolean, false),
    unlocked: types.optional(types.boolean, false)
  })
  .actions(self => ({
    /** Validate the wallet password chosen by user  */
    checkNewPassword: async (): Promise<boolean> =>
      await actions.checkNewPassword(self),
    /** Attempt to unlock the wallet with password entered by user  */
    checkPassword: async (): Promise<boolean> =>
      await actions.checkPassword(self),
    /** Verify user has seed written down by checking three random seed words */
    checkSeed: async (): Promise<boolean> =>
      await actions.checkSeed(self),
    /** Generate a new wallet seed; required on first start of app */
    generateSeed: async (): Promise<boolean> =>
      await actions.generateSeed(self),
    /** Fetch the on-chain wallet balances using the lnd grpc api */
    getBalance: async (): Promise<boolean> =>
      await actions.getBalance(self),
    /** Fetch lightning channel balances using the lnd grpc api */
    getChannelBalance: async (): Promise<boolean> =>
      await actions.getChannelBalance(self),
    /** Fetch a current btc/fiat exchange rate */
    getExchangeRate: async (): Promise<boolean> =>
      await actions.getExchangeRate(self),
    /** Fetch a new on-chain bitcoin address */
    getNewAddress: async (): Promise<boolean> =>
      await actions.getNewAddress(self),
    /** Initialize the wallet by attempting to generate a new seed */
    init: async (): Promise<boolean> =>
      await actions.init(self),
    /** Ensure wallet address is non-null before further onboarding */
    initInitialDeposit: async (): Promise<boolean> =>
      await actions.initInitialDeposit(self),
    /** Init password view */
    initPassword: async (): Promise<boolean> =>
      await actions.initPassword(self),
    /** Init seed verify */
    initSeedVerify: async (): Promise<boolean> =>
      await actions.initSeedVerify(self),
    /** Init set password view */
    initSetPassword: async (): Promise<boolean> =>
      await actions.initSetPassword(self),
    /** Init lnd wallet using generated seed and password */
    initWallet: async (walletPassword: string, seedMnemonic: string[]): Promise<boolean> =>
      await actions.initWallet(self, walletPassword, seedMnemonic),
    /** Poll wallet balances in the background */
    pollBalances: async (): Promise<boolean> =>
      await actions.pollBalances(self),
    /** Poll the current btc/fiat exchange rate every X minutes */
    pollExchangeRate: async (): Promise<boolean> =>
      await actions.pollExchangeRate(self),
    /** Unlock the wallet by calling the grpc api with the user chosen password */
    unlockWallet: async (walletPassword: string): Promise<boolean> =>
      await actions.unlockWallet(self, walletPassword),
    /** Update the wallet on-chain and channel balances */
    update: async (): Promise<boolean> =>
      await actions.update(self),
    /** Basic setters */
    setAddress(value: string) {
      self.address = value
    },
    setBalanceConfirmedSatoshis(value: number) {
      self.balanceConfirmedSatoshis = value
    },
    setBalanceSatoshis(value: number) {
      self.balanceSatoshis = value
    },
    setBalanceUnconfirmedSatoshis(value: number) {
      self.balanceUnconfirmedSatoshis = value
    },
    setChannelBalanceSatoshis(value: number) {
      self.channelBalanceSatoshis = value
    },
    setChannelPendingBalanceSatoshis(value: number) {
      self.channelPendingBalanceSatoshis = value
    },
    setPassword(value: string) {
      self.password = value
    },
    setPasswordVerify(value: string) {
      self.passwordVerify = value
    },
    setSeedMnemonic(value: any) {
      self.seedMnemonic = value
    },
    setSeedVerify(value: any) {
      self.seedVerify = value
    },
    setUnlocked(value: boolean) {
      self.unlocked = value
    }
  }))

/**
 * An instance of a WalletStore.
 */
export type WalletStore = typeof WalletStoreModel.Type

/**
 * The serialized version of a `WalletStore` often used when acquiring
 * data from an API (for example).
 */
export type WalletStoreSnapshot = typeof WalletStoreModel.SnapshotType
