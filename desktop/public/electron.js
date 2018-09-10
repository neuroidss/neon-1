const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const { startLndProcess, startBtcdProcess } = require('./lnd-child-process')
const grpcClient = require('./grpc-client')
const {
  PREFIX_NAME,
  NETWORK,
  LND_PORT,
  LND_PEER_PORT,
  LND_INIT_DELAY,
  BTCD_MINING_ADDRESS,
} = require('../src/config')

const userDataPath = app.getPath('userData')
const lndSettingsDir = path.join(isDev ? 'data' : userDataPath, 'lnd')
const btcdSettingsDir = path.join(isDev ? 'data' : userDataPath, 'btcd')
const lndArgs = process.argv.filter(a =>
  /(^--bitcoin)|(^--btcd)|(^--neutrino)/.test(a)
)

let mainWindow
let lndProcess
let btcdProcess

function createWindow() {
  const options = {
    width: 880,
    height: 635,
    backgroundColor: '#190529',
    webPreferences: {
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  }
  mainWindow = new BrowserWindow(options)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => mainWindow = null)

  grpcClient.init({
    ipcMain,
    lndSettingsDir,
    lndPort: LND_PORT,
    network: isDev ? 'simnet' : NETWORK,
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
