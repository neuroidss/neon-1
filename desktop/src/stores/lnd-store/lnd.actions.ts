import { getRoot } from 'mobx-state-tree'
import { Duplex } from 'stream'
import { parseSat, poll, toSatoshis } from '../../helper'

/**
 *
 */
export async function closeLnd(self) {
  const root = getRoot(self) as any
  const { sendIpc } = root.ipcStore
  await sendIpc('lndClose', 'lndClosed')
  return true
}


/**
 * Close a channel using the grpc streaming api and update the state
 * on data events. Once the channel close is complete the channel will
 * be removed from the channels array in the store.
 * @param  {string}  options.channelPoint The channel identifier
 * @param  {Boolean} options.force        Force or cooperative close
 * @return {Promise<undefined>}
 */
export async function closeChannel(self, channelPoint, force = false) {
  const stream = await self.sendStreamCommand('closeChannel', {
    channel_point: _parseChannelPoint(channelPoint),
    force
  })
  await new Promise((resolve, reject) => {
    stream.on('data', data => {
      if (data.close_pending) {
        self.update(self)
      }
      if (data.chan_close) {
        _removeClosedChannel(self, channelPoint)
      }
    })
    stream.on('end', resolve)
    stream.on('error', reject)
    stream.on('status', status => console.log(`Closing channel: ${status}`))
  })
  return true
}


/**
 * Close the selected channel by attempting a cooperative close.
 * This action can be called from a view event handler as does all
 * the necessary error handling and notification display.
 * @return {Promise<undefined>}
 */
export async function closeSelectedChannel(self) {
  try {
    // const { selectedChannel } = this._store;
    // this._nav.goChannels();
    await self.closeChannel(self.selectedChannel.channelPoint);
  } catch (err) {
    console.log('Closing channel failed:', err)
    // this._notification.display({ msg: 'Closing channel failed!', err });
  }
  return true
}


/**
 * This GRPC api is called after the wallet is unlocked to close the grpc
 * client to lnd before the main lnd client is re-opened
 * @return {Promise<undefined>}
 */
export async function closeUnlocker(self) {
  const root = getRoot(self) as any
  const { sendIpc } = root.ipcStore
  await sendIpc('unlockClose', 'unlockClosed')
  return true
}


/**
 * Attempt to connect to a peer and open a channel in a single call.
 * If a connection already exists, just a channel will be opened.
 * This action can be called from a view event handler as does all
 * the necessary error handling and notification display.
 * @return {Promise<undefined>}
 */
export async function connectAndOpenChannel(self) {
  try {
    const settings = { displayFiat: false, unit: 'sat' } // TODO: Tie to store
    // const { channel, settings } = this._store;
    const amount = toSatoshis(self.channelAmount, settings);
    if (!self.pubKeyAtHost.includes('@')) {
      // return this._notification.display({ msg: 'Please enter pubkey@host' });
      console.log('Please enter pubkey@host')
    }
    // this._nav.goChannels();
    const pubkey = self.pubKeyAtHost.split('@')[0]
    const host = self.pubKeyAtHost.split('@')[1]
    await self.connectToPeer(host, pubkey)
    await self.openChannel(pubkey, amount)
  } catch (err) {
    console.log('Creating channel failed:', err)
    // this._nav.goChannelCreate()
    // this._notification.display({ msg: 'Creating channel failed!', err })
  }
  return true
}


/**
 * Connect to peer and fail gracefully by catching exceptions and
 * logging their output.
 * @param  {string} options.host   The hostname of the peer
 * @param  {string} options.pubkey The public key of the peer
 * @return {Promise<undefined>}
 */
export async function connectToPeer(self, host, pubkey) {
  try {
    await self.sendCommand('connectPeer', {
      addr: { host, pubkey },
    });
  } catch (err) {
    console.log('Connecting to peer failed', err);
  }
  return true
}


/**
 * Open a channel to a peer without advertising it and update channel
 * state on data event from the streaming grpc api.
 * @param  {string} options.pubkey The public key of the peer
 * @param  {number} options.amount The amount in satoshis to fund the channel
 * @return {Promise<undefined>}
 */
export async function openChannel(self, pubkey, amount) {
  const stream = await self.sendStreamCommand('openChannel', {
    node_pubkey: new Buffer(pubkey, 'hex'),
    local_funding_amount: amount,
    private: true,
  })
  await new Promise((resolve, reject) => {
    stream.on('data', () => self.update())
    stream.on('end', resolve)
    stream.on('error', reject)
    stream.on('status', status => console.log(`Opening channel:`, status))
  })
  return true
}


/**
 * List the open channels by calling the respective grpc api and updating
 * the channels array in the global store.
 // TODO: Fix the MST error on channel updating blah here
 * @return {Promise<undefined>}
 */
export async function getChannels(self) {
  try {
    const { channels } = await self.sendCommand('listChannels')
    const theChannels = channels.map(channel => ({
      remotePubkey: channel.remote_pubkey,
      id: channel.chan_id,
      capacity: parseSat(channel.capacity),
      localBalance: parseSat(channel.local_balance),
      remoteBalance: parseSat(channel.remote_balance),
      channelPoint: channel.channel_point,
      fundingTxId: _parseChannelPoint(channel.channel_point)
        .funding_txid_str,
      active: channel.active,
      private: channel.private,
      status: 'open',
    }))
    self.setChannels(theChannels)
    return true
  } catch (err) {
    console.log('Listing channels failed', err);
    return false
  }
}


/**
 * Fetches the current details of the lnd node and sets the corresponding
 * store parameters. This api is polled at the beginning of app initialization
 * until lnd has finished syncing the chain to the connected bitcoin full node.
 * @return {Promise<undefined>}
 */
export async function getInfo(self) {
  try {
    const response = await self.sendCommand('getInfo');
    self.setPubKey(response.identity_pubkey)
    self.setSyncedToChain(response.synced_to_chain)

    // this._store.blockHeight = response.block_height;
    // if (this.startingSyncTimestamp === undefined) {
    //   this.startingSyncTimestamp = response.best_header_timestamp || 0;
    // }
    // if (!response.synced_to_chain) {
    //   this._notification.display({ msg: 'Syncing to chain', wait: true });
    //   log.info(`Syncing to chain ... block height: ${response.block_height}`);
    //   this._store.percentSynced = this.calcPercentSynced(response);
    // }
    return response.synced_to_chain;
  } catch (err) {
    console.log('Getting node info failed', err);
  }
}


/**
 * List the pending channels by calling the respective grpc api and updating
 * the pendingChannels array in the global store.
 * @return {Promise<undefined>}
 */
export async function getPendingChannels(self) {
  try {
    const response = await self.sendCommand('pendingChannels')
    const mapPendingAttributes = channel => ({
      remotePubkey: channel.remote_node_pub,
      capacity: parseSat(channel.capacity),
      localBalance: parseSat(channel.local_balance),
      remoteBalance: parseSat(channel.remote_balance),
      channelPoint: channel.channel_point,
      fundingTxId: _parseChannelPoint(channel.channel_point).funding_txid_str
    })
    const pocs = response.pending_open_channels.map(poc => ({
      ...mapPendingAttributes(poc.channel),
      confirmationHeight: poc.confirmation_height,
      blocksTillOpen: poc.blocks_till_open,
      commitFee: poc.commit_fee,
      commitWeight: poc.commit_weight,
      feePerKw: poc.fee_per_kw,
      status: 'pending-open'
    }))
    const pccs = response.pending_closing_channels.map(pcc => ({
      ...mapPendingAttributes(pcc.channel),
      closingTxid: pcc.closing_txid,
      status: 'pending-closing'
    }))
    const pfccs = response.pending_force_closing_channels.map(pfcc => ({
      ...mapPendingAttributes(pfcc.channel),
      closingTxid: pfcc.closing_txid,
      limboBalance: pfcc.limbo_balance,
      maturityHeight: pfcc.maturity_height,
      blocksTilMaturity: pfcc.blocks_til_maturity,
      status: 'pending-force-closing'
    }))
    const wccs = response.waiting_close_channels.map(wcc => ({
      ...mapPendingAttributes(wcc.channel),
      limboBalance: wcc.limbo_balance,
      status: 'waiting-close'
    }))
    const pendingChannels = [].concat(pocs, pccs, pfccs, wccs)
    self.setPendingChannels(pendingChannels)
  } catch (err) {
    console.log('Listing pending channels failed', err);
  }
  return true
}


/**
 * List the peers by calling the respective grpc api and updating
 * the peers array in the global store.
 * @return {Promise<undefined>}
 */
export async function getPeers(self) {
  try {
    const { peers } = await self.sendCommand('listPeers');
    const thePeers = peers.map(peer => ({
      pubKey: peer.pub_key,
      peerId: peer.peer_id,
      address: peer.address,
      bytesSent: peer.bytes_sent,
      bytesRecv: peer.bytes_recv,
      satSent: peer.sat_sent,
      satRecv: peer.sat_recv,
      inbound: peer.inbound,
      pingTime: peer.ping_time,
    }))
    self.setPeers(thePeers)
  } catch (err) {
    console.log('Listing peers failed', err);
  }
  return true
}


/**
 * This is called to initialize the main GRPC client to lnd. Once `lndReady`
 * is set to true on the store GRPC calls can be made to the client.
 * @return {Promise<undefined>}
 */
export async function initLnd(self) {
  const root = getRoot(self) as any
  const { sendIpc } = root.ipcStore
  await sendIpc('lndInit', 'lndReady')  // TODO: Right now this is just waiting for the TRUE of the basic action-- needs to be the internal promise..
  self.setLndReady(true)
  return true
}


/**
 * The first GRPC api that is called to initialize the wallet unlocker.
 * Once `unlockerReady` is set to true on the store GRPC calls can be
 * made to the client.
 * @return {Promise<boolean>}
 */
export async function initUnlocker(self) {
  const root = getRoot(self) as any
  const { sendIpc } = root.ipcStore
  await sendIpc('unlockInit', 'unlockReady')
  self.setUnlockerReady(true)
  return true
}


/**
 * Poll the getInfo api until synced_to_chain is true.
 * @return {Promise<undefined>}
 */
export async function pollInfo(self) {
  await poll(() => self.getInfo())
  return true
}


/**
 * Wrapper function to execute calls to the lnd grpc client.
 * @param  {string} method The lnd GRPC api to call
 * @param  {Object} body   The payload passed to the api
 * @return {Promise<Object>}
 */
export async function sendCommand(self, method, body) {
  const root = getRoot(self) as any
  const { sendIpc } = root.ipcStore
  return sendIpc('lndRequest', 'lndResponse', method, body)
}


/**
 * Wrapper function to execute GRPC streaming api calls to lnd. This function
 * proxies data to and from lnd using a duplex stream which is returned.
 * @param  {string} method The lnd GRPC api to call
 * @param  {Object} body   The payload passed to the api
 * @return {Duplex}        The duplex stream object instance
 */
export async function sendStreamCommand(self, method, body) {
  const root = getRoot(self) as any
  const { listen, send } = root.ipcStore
  const stream = new Duplex({
    write(data) {
      data = JSON.parse(data.toString('utf8'))
      send('lndStreamWrite', null, { method, data })
    },
    read() {}
  })
  listen(`lndStreamEvent_${method}`, (e, arg) => {
    stream.emit(arg.event, arg.data || arg.err)
  })
  send('lndStreamRequest', null, { method, body })
  return stream
}


/**
 * Wrapper function to execute calls to the wallet unlocker.
 * @param  {string} method The unlocker GRPC api to call
 * @param  {Object} body   The payload passed to the api
 * @return {Promise<Object>}
 */
export async function sendUnlockerCommand(self, method, body) {
  const root = getRoot(self) as any
  const { sendIpc } = root.ipcStore
  return sendIpc('unlockRequest', 'unlockResponse', method, body)
}


/**
 * Update the peers, channels, and pending channels in the app state
 * by querying all required grpc apis.
 * @return {Promise<undefined>}
 */
export async function update(self) {
  await Promise.all([
    self.getPeers(),
    self.getChannels(),
    self.getPendingChannels()
  ])
  return true
}


function _parseChannelPoint(channelPoint) {
  if (!channelPoint || !channelPoint.includes(':')) {
    throw new Error('Invalid channel point')
  }
  return {
    funding_txid_str: channelPoint.split(':')[0],
    output_index: parseInt(channelPoint.split(':')[1], 10),
  }
}

function _removeClosedChannel(self, channelPoint) {
  const pc = self.pendingChannels.slice()
  const channel = pc.find(c => c.channelPoint === channelPoint)
  if (channel) pc.splice(pc.indexOf(channel))
  self.setPendingChannels(pc)
}
