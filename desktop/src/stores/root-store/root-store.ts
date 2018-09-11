import { types } from 'mobx-state-tree'
import { IpcStoreModel } from '../ipc-store'
import { LndStoreModel } from '../lnd-store'
import { UiStoreModel } from '../ui-store'
import { UserStoreModel } from '../user-store'
import { WalletStoreModel } from '../wallet-store'

/**
 * An RootStore model.
 */
export const RootStoreModel = types
  .model('Root')
  .props({
    // @ts-ignore
    ipcStore: types.optional(IpcStoreModel, { ipcRenderer: window.ipcRenderer }),
    lndStore: types.optional(LndStoreModel, {}),
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
