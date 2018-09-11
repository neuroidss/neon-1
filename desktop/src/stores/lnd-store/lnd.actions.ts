import { getRoot } from 'mobx-state-tree'
import { Duplex } from 'stream'

/**
 * This GRPC api is called after the wallet is unlocked to close the grpc
 * client to lnd before the main lnd client is re-opened
 * @return {Promise<undefined>}
 */
export async function closeUnlocker(self) {
  const root = getRoot(self) as any
  const { sendIpc } = root.ipcStore
  await sendIpc('unlockClose', 'unlockClosed')
  console.tron.log('GRPC unlockerClosed')
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
