import { types } from 'mobx-state-tree'
import * as actions from './lnd.actions'
import { Duplex } from 'stream'

/**
 * Handles lnd state
 */
export const LndStoreModel = types
  .model('LndStore')
  .props({
    lndReady: types.optional(types.boolean, false),
    syncedToChain: types.optional(types.boolean, false),
    unlockerReady: types.optional(types.boolean, false),
  })
  .actions(self => ({
    /** Close the grpc client to lnd before the main lnd client is re-opened */
    closeUnlocker: async (): Promise<boolean> =>
      await actions.closeUnlocker(self),
    /** Initialize the main GRPC client to lnd */
    initLnd: async (): Promise<boolean> =>
      await actions.initLnd(self),
    /** Initialize the wallet unlocker */
    initUnlocker: async (): Promise<boolean> =>
      await actions.initUnlocker(self),
    /** Wrapper function to execute calls to the lnd grpc client */
    sendCommand: async (method: string, body: any): Promise<boolean> =>
      await actions.sendCommand(self, method, body),
    /** Wrapper function to execute GRPC streaming api calls to lnd */
    sendStreamCommand: async (method: string, body: any): Promise<Duplex> =>
      await actions.sendStreamCommand(self, method, body),
    /** Wrapper function to execute calls to the wallet unlocker */
    sendUnlockerCommand: async (method: string, body: any): Promise<boolean> =>
      await actions.sendUnlockerCommand(self, method, body),
    /** Basic setters */
    setLndReady (value: boolean) {
      self.lndReady = value
    },
    setUnlockerReady (value: boolean) {
      self.unlockerReady = value
    }
  }))

/**
 * An instance of a LndStore.
 */
export type LndStore = typeof LndStoreModel.Type

/**
 * The serialized version of a `LndStore` often used when acquiring
 * data from an API (for example).
 */
export type LndStoreSnapshot = typeof LndStoreModel.SnapshotType
