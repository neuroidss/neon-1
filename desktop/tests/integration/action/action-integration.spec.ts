import { RootStoreModel } from '../../../src/stores/root-store'
import { IpcStoreModel } from '../../../src/stores/ipc-store'
import { EventEmitter } from 'events'
import { nap, retry } from '../../../src/helper'
import { rmdir, isPortOpen } from './test-util'
import { startLndProcess, startBtcdProcess, mineBlocks } from '../../../public/lnd-child-process'
import { init as grpcInit } from '../../../public/grpc-client'

let expect = require('unexpected').clone()
expect.use(require('unexpected-sinon'))

const isDev = true
const NETWORK = 'simnet'
const BTCD_PORT = 18555
const BTCD_SETTINGS_DIR = 'tests/data/btcd'
const LND_SETTINGS_DIR_1 = 'tests/data/lnd_1'
const LND_SETTINGS_DIR_2 = 'tests/data/lnd_2'
const LND_PORT_1 = 10001
const LND_PORT_2 = 10002
const LND_PEER_PORT_1 = 10011
const LND_PEER_PORT_2 = 10012
const LND_PROFILING_PORT_1 = 10021
const LND_PROFILING_PORT_2 = 10022
const LND_REST_PORT_1 = 8001
const LND_REST_PORT_2 = 8002
// const HOST_1 = `localhost:${LND_PEER_PORT_1}`
const HOST_2 = `localhost:${LND_PEER_PORT_2}`
const NAP_TIME = 5000
const walletPassword = 'bitconneeeeeect'

// @ts-ignore
console.tron = {
  log: (wat) => console.log(wat)
}
const wireUpIpc = (s1, s2) => {
  s1.send = (msg, ...args) => {
    setTimeout(() => s2.emit(msg, { sender: s2 }, ...args), 1)
  }
}

const ipcMainStub1 = new EventEmitter()
const ipcRendererStub1 = new EventEmitter()

const ipcMainStub2 = new EventEmitter()
const ipcRendererStub2 = new EventEmitter()

wireUpIpc(ipcMainStub1, ipcRendererStub1)
wireUpIpc(ipcRendererStub1, ipcMainStub1)

wireUpIpc(ipcMainStub2, ipcRendererStub2)
wireUpIpc(ipcRendererStub2, ipcMainStub2)

let store1
let store2
let btcdArgs
let btcdProcess
let lndProcess1
let lndProcess2

const logger = {
  info: (wat) => console.log(wat)
}

describe('Action Integration Tests', function () {

  this.timeout(300000)

  before(async () => {
    rmdir('tests/data')

    btcdArgs = {
      isDev,
      logger,
      btcdSettingsDir: BTCD_SETTINGS_DIR,
    }
    btcdProcess = await startBtcdProcess(btcdArgs)
    await nap(NAP_TIME)
    await retry(() => isPortOpen(BTCD_PORT))
    const lndProcess1Promise = startLndProcess({
      isDev,
      lndSettingsDir: LND_SETTINGS_DIR_1,
      lndPort: LND_PORT_1,
      lndPeerPort: LND_PEER_PORT_1,
      lndProfilingPort: LND_PROFILING_PORT_1,
      lndRestPort: LND_REST_PORT_1,
      logger
    })
    const lndProcess2Promise = startLndProcess({
      isDev,
      lndSettingsDir: LND_SETTINGS_DIR_2,
      lndPort: LND_PORT_2,
      lndPeerPort: LND_PEER_PORT_2,
      lndProfilingPort: LND_PROFILING_PORT_2,
      lndRestPort: LND_REST_PORT_2,
      logger
    })

    lndProcess1 = await lndProcess1Promise
    lndProcess2 = await lndProcess2Promise

    await grpcInit({
      ipcMain: ipcMainStub1,
      lndPort: LND_PORT_1,
      lndSettingsDir: LND_SETTINGS_DIR_1,
      network: NETWORK,
    })
    await grpcInit({
      ipcMain: ipcMainStub2,
      lndPort: LND_PORT_2,
      lndSettingsDir: LND_SETTINGS_DIR_2,
      network: NETWORK,
    })

    store1 = RootStoreModel.create({})
    store2 = RootStoreModel.create({})

    await store1.ipcStore.setRenderer(ipcRendererStub1)
    await store2.ipcStore.setRenderer(ipcRendererStub2)
  })

  after(async () => {
    console.log('Killing btcd+lnd processes...')
    await Promise.all([store1.lndStore.closeLnd(), store2.lndStore.closeLnd()])
    // console.log('Waiting...')
    // await nap(5000)
    lndProcess1.kill('SIGINT')
    lndProcess2.kill('SIGINT')
    btcdProcess.kill('SIGINT')
    console.log('Done!')
  })

  describe('Generate seed and unlock wallet', () => {
    it('should wait for unlockerReady', async function () {
      await store1.lndStore.initUnlocker()
      expect(store1.lndStore.unlockerReady, 'to be true')
      await store2.lndStore.initUnlocker()
      expect(store2.lndStore.unlockerReady, 'to be true')
    })

    it('should generate new seed', async () => {
      await store1.walletStore.generateSeed()
      expect(store1.walletStore.seedMnemonic, 'to be ok')
      await store2.walletStore.generateSeed()
      expect(store2.walletStore.seedMnemonic, 'to be ok')
    })

    it('should import existing seed', async () => {
      await store1.walletStore.initWallet(
        walletPassword,
        store1.walletStore.seedMnemonic.toJSON()
      )
      expect(store1.walletStore.unlocked, 'to be true')
      await store2.walletStore.initWallet(
        walletPassword,
        store2.walletStore.seedMnemonic.toJSON()
      )
      expect(store2.walletStore.unlocked, 'to be true')
    });

    it('should close unlocker grpc clients', async () => {
      await nap(NAP_TIME)
      await store1.lndStore.closeUnlocker()
      await store2.lndStore.closeUnlocker()
    })
  })

  describe('Wallet and Info actions', () => {
    it('should wait for lndReady', async () => {
      await store1.lndStore.initLnd()
      expect(store1.lndStore.lndReady, 'to be true')
      await store2.lndStore.initLnd()
      expect(store2.lndStore.lndReady, 'to be true')
    })

    it('should create new address for node1', async () => {
      await store1.walletStore.getNewAddress()
      expect(store1.walletStore.address, 'to be ok')
    })

    it('should fund wallet for node1', async () => {
      btcdProcess.kill('SIGINT')
      btcdArgs.miningAddress = store1.walletStore.address
      btcdProcess = await startBtcdProcess(btcdArgs)
      await nap(NAP_TIME)
      await retry(() => isPortOpen(BTCD_PORT))
      await mineAndSync({ blocks: 400 })
    })

    it('should get public key node1', async () => {
      await store1.lndStore.pollInfo()
      expect(store1.lndStore.pubKey, 'to be ok')
    })

    it('should wait until node1 is synced to chain', async () => {
      while (!store1.lndStore.syncedToChain) await nap(100)
      expect(store1.lndStore.syncedToChain, 'to be true')
    })

    it('should create new address for node2', async () => {
      await store2.walletStore.getNewAddress()
      expect(store2.walletStore.address, 'to be ok')
    })

    it('should list no transactions initially', async () => {
      await store2.payLnStore.getTransactions()
      expect(store2.payLnStore.transactions, 'to be empty')
      store2.payLnStore.subscribeTransactions()
    })

    it('should send some on-chain funds to node2', async () => {
      store1.payLnStore.setPayAddress(store2.walletStore.address)
      store1.payLnStore.setPayAmount('100000')
      await store1.payLnStore.payBitcoin()
    })

    it('should list transaction as confirmed after mining 6 blocks', async () => {
      await mineAndSync({ blocks: 6 })
      while (!store2.payLnStore.transactions.length) await nap(100)
      const tx = store2.payLnStore.computedTransactions.find(t => t.type === 'bitcoin')
      expect(tx.confirmations, 'to be positive')
    })

    it('should get public key node2', async () => {
      await store2.lndStore.pollInfo()
      expect(store2.lndStore.pubKey, 'to be ok')
    })

    it('should wait until node2 is synced to chain', async () => {
      while (!store2.lndStore.syncedToChain) await nap(100)
      expect(store2.lndStore.syncedToChain, 'to be true')
    })

    it('should have no satoshis in channel balance', async () => {
      await updateBalances()
      expect(store1.walletStore.balanceSatoshis, 'to be positive')
      expect(store2.walletStore.balanceSatoshis, 'to be positive')
      expect(store1.walletStore.channelBalanceSatoshis, 'to be', 0)
      expect(store2.walletStore.channelBalanceSatoshis, 'to be', 0)
      expect(store1.walletStore.channelPendingBalanceSatoshis, 'to be', 0)
      expect(store2.walletStore.channelPendingBalanceSatoshis, 'to be', 0)
    })
  })

  describe('Channel and Payment actions', () => {
    it('should list no peers initially', async () => {
      await store1.lndStore.getPeers()
      expect(store1.lndStore.peers, 'to be empty');
    })

    it('should list no pending channels initially', async () => {
      await store1.lndStore.getPendingChannels()
      expect(store1.lndStore.pendingChannels, 'to be empty')
    })

    it('should list no open channels initially', async () => {
      await store1.lndStore.getChannels()
      expect(store1.lndStore.channels, 'to be empty')
    })

    it('should connect to peer and open channel', () => {
      store1.lndStore.setChannelAmount('30000')
      store1.lndStore.setPubKeyAtHost(`${store2.lndStore.pubKey}@${HOST_2}`)
      store1.lndStore.connectAndOpenChannel()
    })

    it('should list pending open channel', async () => {
      while (!store1.lndStore.pendingChannels.length) await nap(100)
      expect(store1.lndStore.peers[0].pubKey, 'to be', store2.lndStore.pubKey)
      expect(store1.lndStore.computedChannels.length, 'to be', 1)
      expect(store1.lndStore.computedChannels[0].status, 'to be', 'pending-open')
    })

    it('should have enough satoshis in pending balance', async () => {
      await updateBalances()
      expect(store1.walletStore.channelPendingBalanceSatoshis, 'to be positive')
      expect(store2.walletStore.channelPendingBalanceSatoshis, 'to be', 0)
      expect(store1.walletStore.channelBalanceSatoshis, 'to be', 0)
      expect(store2.walletStore.channelBalanceSatoshis, 'to be', 0)
    })

    it('should list open channel after mining 6 blocks', async () => {
      await mineAndSync({ blocks: 6 })
      while (store1.lndStore.pendingChannels.length) await nap(100)
      while (!store1.lndStore.channels.length) await nap(100)
      expect(store1.lndStore.computedChannels.length, 'to be', 1)
      expect(store1.lndStore.computedChannels[0].status, 'to be', 'open')
    })

    it('should have enough satoshis in channel balance', async () => {
      await updateBalances()
      expect(store1.walletStore.channelPendingBalanceSatoshis, 'to be', 0)
      expect(store2.walletStore.channelPendingBalanceSatoshis, 'to be', 0)
      expect(store1.walletStore.channelBalanceSatoshis, 'to be positive')
      expect(store2.walletStore.channelBalanceSatoshis, 'to be', 0)
    })

    it('should list no invoices initially', async () => {
      await store2.payLnStore.getInvoices()
      expect(store2.payLnStore.invoices, 'to be empty')
    })

    it('should generate payment request', async () => {
      store2.payLnStore.setInvoiceAmount('100') // 0.000001
      store2.payLnStore.setInvoiceNote('coffee')
      await store2.payLnStore.generateUri()
      expect(store2.payLnStore.invoiceUri, 'to match', /^lightning:/)
    })

    it('should list new invoice as in-progress', async () => {
      await store2.payLnStore.getInvoices()
      expect(store2.payLnStore.invoices[0].status, 'to be', 'in-progress')
      store2.payLnStore.subscribeInvoices()
    })

    it('should not decode invalid invoice and return false', async () => {
      const isValid = await store1.payLnStore.decodeInvoice('lightning:invalid_payment_request')
      expect(isValid, 'to be', false)
    })

    it('should decode invoice, set fee and return true', async () => {
      const isValid = await store1.payLnStore.decodeInvoice(store2.payLnStore.invoiceUri)
      expect(isValid, 'to be', true)
      expect(
        parseFloat(store1.payLnStore.invoiceFee),
        'to be greater than or equal to',
        0
      )
    })

    it('should send lightning payment from request', async () => {
      store1.payLnStore.setPayAddress(store2.payLnStore.invoiceUri)
      await store1.payLnStore.payLightning()
    })

    it('should update complete invoice via subscription', async () => {
      while (store2.payLnStore.invoices[0].status === 'in-progress') await nap(100)
      const tx = store2.payLnStore.computedTransactions.find(t => t.type === 'lightning')
      expect(tx.status, 'to be', 'complete')
    })

    it('should have satoshis in node2 channel balance after payment', async () => {
      await updateBalances()
      expect(store2.walletStore.channelBalanceSatoshis, 'to be', 100)
    })

    it('should list waiting-close channel after closing', async () => {
      store1.lndStore.setSelectedChannel(store1.lndStore.computedChannels[0])
      store1.lndStore.closeSelectedChannel()
      while (!store1.lndStore.pendingChannels.length) await nap(100)
      while (store1.lndStore.channels.length) await nap(100)
      expect(store1.lndStore.computedChannels.length, 'to be', 1)
      expect(store1.lndStore.computedChannels[0].status, 'to be', 'waiting-close')
    })

    it('should list no channels after mining 6 blocks', async () => {
      await mineAndSync({ blocks: 6 })
      while (store1.lndStore.pendingChannels.length) await nap(100)
      expect(store1.lndStore.computedChannels.length, 'to be', 0)
    })

    it('should list pending open channel after opening', async () => {
      store1.lndStore.openChannel(store2.lndStore.pubKey, 1000000)
      while (!store1.lndStore.pendingChannels.length) await nap(100)
      expect(store1.lndStore.computedChannels.length, 'to be', 1)
      expect(store1.lndStore.computedChannels[0].status, 'to be', 'pending-open')
    })

    it('should list open channel after mining 6 blocks', async () => {
      await mineAndSync({ blocks: 6 })
      while (store1.lndStore.pendingChannels.length) await nap(100)
      while (!store1.lndStore.channels.length) await nap(100)
      expect(store1.lndStore.computedChannels.length, 'to be', 1)
      expect(store1.lndStore.computedChannels[0].status, 'to be', 'open')
      expect(store1.lndStore.computedChannels[0].private, 'to be', true)
    })

    it('should list waiting-close after force closing', async () => {
      store1.lndStore.closeChannel(
        store1.lndStore.channels[0].channelPoint,
        true
      )
      while (!store1.lndStore.pendingChannels.length) await nap(100)
      while (store1.lndStore.channels.length) await nap(100)
      expect(store1.lndStore.computedChannels.length, 'to be', 1)
      expect(store1.lndStore.computedChannels[0].status, 'to be', 'waiting-close')
    })

    it('should list no channels after mining 6 blocks', async () => {
      await mineAndSync({ blocks: 6 })
      while (store1.lndStore.pendingChannels.length) await nap(100)
      expect(store1.lndStore.computedChannels.length, 'to be', 0)
    })
  })

  const mineAndSync = async ({ blocks }) => {
    await mineBlocks({ blocks, logger })
    await store1.lndStore.pollInfo()
    await store2.lndStore.pollInfo()
  }

  const updateBalances = async () => {
    await store1.walletStore.getBalance()
    await store1.walletStore.getChannelBalance()
    await store2.walletStore.getBalance()
    await store2.walletStore.getChannelBalance()
  }
})
