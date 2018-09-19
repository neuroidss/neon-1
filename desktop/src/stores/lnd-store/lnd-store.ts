import { types } from 'mobx-state-tree'
import * as actions from './lnd.actions'
import { Duplex } from 'stream'
import { toAmountLabel, toCaps } from '../../helper'

const Channel = types.model({
  blocksTilMaturity: types.maybe(types.string),
  blocksTillOpen: types.maybe(types.string),
  capacity: types.maybe(types.number),
  channelPoint: types.maybe(types.string),
  closingTxid: types.maybe(types.string),
  commitFee: types.maybe(types.string),
  commitWeight: types.maybe(types.string),
  confirmationHeight: types.maybe(types.number),
  feePerKw: types.maybe(types.string),
  fundingTxId: types.maybe(types.identifier(types.string)),
  limboBalance: types.maybe(types.string),
  localBalance: types.maybe(types.number),
  maturityHeight: types.maybe(types.string),
  private: types.maybe(types.boolean),
  remoteBalance: types.maybe(types.number),
  remotePubkey: types.maybe(types.string),
  status: types.maybe(types.string)
})

const Peer = types.model({
  pubKey: types.maybe(types.string),
  peerId: types.maybe(types.string),
  address: types.maybe(types.string),
  bytesSent: types.maybe(types.string),
  bytesRecv: types.maybe(types.string),
  satSent: types.maybe(types.string),
  satRecv: types.maybe(types.string),
  inbound: types.maybe(types.boolean),
  pingTime: types.maybe(types.string)
})

/**
 * Handles lnd state including channels
 */
export const LndStoreModel = types
  .model('LndStore')
  .props({
    channelAmount: types.optional(types.string, ''),
    channels: types.optional(types.array(Channel), []),
    lndReady: types.optional(types.boolean, false),
    peers: types.optional(types.array(Peer), []),
    pendingChannels: types.optional(types.array(Channel), []),
    pubKey: types.optional(types.string, ''),
    pubKeyAtHost: types.optional(types.string, ''),
    selectedChannel: types.maybe(types.reference(Channel)),
    syncedToChain: types.optional(types.boolean, false),
    unlockerReady: types.optional(types.boolean, false),
  })
  .actions(self => ({
    closeLnd: async (): Promise<boolean> =>
      await actions.closeLnd(self),
    closeChannel: async (channelPoint: string, force: boolean): Promise<boolean> =>
      await actions.closeChannel(self, channelPoint, force = false),
    closeSelectedChannel: async (): Promise<boolean> =>
      await actions.closeSelectedChannel(self),
    /** Close the grpc client to lnd before the main lnd client is re-opened */
    closeUnlocker: async (): Promise<boolean> =>
      await actions.closeUnlocker(self),
    connectToPeer: async (host: string, pubkey: string): Promise<boolean> =>
      await actions.connectToPeer(self, host, pubkey),
    connectAndOpenChannel: async (): Promise<boolean> =>
      await actions.connectAndOpenChannel(self),
    getChannels: async (): Promise<boolean> =>
      await actions.getChannels(self),
    getInfo: async (): Promise<boolean> =>
      await actions.getInfo(self),
    getPeers: async (): Promise<boolean> =>
      await actions.getPeers(self),
    getPendingChannels: async (): Promise<boolean> =>
      await actions.getPendingChannels(self),
    /** Initialize the main GRPC client to lnd */
    initLnd: async (): Promise<boolean> =>
      await actions.initLnd(self),
    /** Initialize the wallet unlocker */
    initUnlocker: async (): Promise<boolean> =>
      await actions.initUnlocker(self),
    openChannel: async (pubkey: string, amount: string): Promise<boolean> =>
      await actions.openChannel(self, pubkey, amount),
    pollInfo: async (): Promise<boolean> =>
      await actions.pollInfo(self),
    /** Wrapper function to execute calls to the lnd grpc client */
    sendCommand: async (method: string, body: any): Promise<boolean> =>
      await actions.sendCommand(self, method, body),
    /** Wrapper function to execute GRPC streaming api calls to lnd */
    sendStreamCommand: async (method: string, body: any): Promise<Duplex> =>
      await actions.sendStreamCommand(self, method, body),
    /** Wrapper function to execute calls to the wallet unlocker */
    sendUnlockerCommand: async (method: string, body: any): Promise<boolean> =>
      await actions.sendUnlockerCommand(self, method, body),
    update: async (): Promise<boolean> =>
      await actions.update(self),
    /** Basic setters */
    setLndReady (value: boolean) {
      self.lndReady = value
    },
    setChannelAmount (value: any) {
      self.channelAmount = value
    },
    setChannels (value: any) {
      self.channels = value
    },
    setPeers (value: any) {
      self.peers = value
    },
    setPendingChannels (value: any) {
      self.pendingChannels = value
    },
    setPubKey (value: string) {
      self.pubKey = value
    },
    setPubKeyAtHost (value: string) {
      self.pubKeyAtHost = value
    },
    setSelectedChannel (value: any) {
      self.selectedChannel = value
    },
    setSyncedToChain (value: boolean) {
      self.syncedToChain = value
    },
    setUnlockerReady (value: boolean) {
      self.unlockerReady = value
    }
  }))
  .views(self => ({
    get computedChannels() {
      const settings = { displayFiat: false, unit: 'sat' } // TODO: Tie to store
      const c = self.channels ? self.channels.slice() : []
      const p = self.pendingChannels ? self.pendingChannels.slice() : []
      const all = [].concat(c, p)
      all.sort(
        (a, b) => (a.status > b.status ? -1 : a.status < b.status ? 1 : 0)
      )
      all.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1))
      all.forEach(c => {
        c.statusLabel = toCaps(c.status);
        c.capacityLabel = toAmountLabel(c.capacity, settings);
        c.localBalanceLabel = toAmountLabel(c.localBalance, settings);
        c.remoteBalanceLabel = toAmountLabel(c.remoteBalance, settings);
      })
      return all;
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
