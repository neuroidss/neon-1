import { types } from 'mobx-state-tree'
import { IpcStoreModel } from '../ipc-store'
import { LndStoreModel } from '../lnd-store'
import { PayLnStoreModel } from '../pay-ln-store'
import { UiStoreModel } from '../ui-store'
import { UserStoreModel } from '../user-store'
import { WalletStoreModel } from '../wallet-store'
import { NavStoreModel } from '@arcadecity/neon-core'

/**
 * An RootStore model.
 */
export const RootStoreModel = types
  .model('Root')
  .props({
    // @ts-ignore
    ipcStore: types.optional(IpcStoreModel, { ipcRenderer: process.env.NODE_ENV ? window.ipcRenderer : undefined }),
    lndStore: types.optional(LndStoreModel, {}),
    navStore: types.optional(NavStoreModel, {}),
    payLnStore: types.optional(PayLnStoreModel, {}),
    uiStore: types.optional(UiStoreModel, {}),
    userStore: types.optional(UserStoreModel, {}),
    walletStore: types.optional(WalletStoreModel, {})
  })

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
