const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const log = require('electron-log')
const cp = require('child_process')

const { startLndProcess, startBtcdProcess } = require('./lnd-child-process')
const grpcClient = require('./grpc-client')
const {
  PREFIX_NAME,
  NETWORK,
  LND_PORT,
  LND_PEER_PORT,
  LND_PROFILING_PORT,
  LND_REST_PORT,
  LND_INIT_DELAY,
  BTCD_MINING_ADDRESS,
} = require('../src/config')

const userDataPath = app.getPath('userData')
const lndSettingsDir = path.join(isDev ? 'data' : userDataPath, 'lnd')
const btcdSettingsDir = path.join(isDev ? 'data' : userDataPath, 'btcd')
const lndArgs = process.argv.filter(a =>
  /(^--bitcoin)|(^--btcd)|(^--neutrino)/.test(a)
)

// Start process to serve Blockstack manifest file
const server = cp.fork(__dirname + '/server.js')

server.on('message', (m) => {
  console.log('message: ' +  m)
    // if (m === 'started') {
    //     // serverStarted = true;
    //     // createWindow();
    //     createWindow()
    //     startLnd()
    // }
})

let mainWindow
let lndProcess
let btcdProcess

// Set default protocol client for redirect
app.setAsDefaultProtocolClient('neon')

/**
 * Log config
 */
log.transports.console.level = 'info'
log.transports.file.level = 'info'
ipcMain.on('log', (event, arg) => log.info(...arg))
ipcMain.on('log-error', (event, arg) => log.error(...arg))
ipcMain.on('locale-get', event =>
  event.sender.send('locale', { response: app.getLocale() })
)

let logQueue = []
let logsReady = false

const sendLog = log => {
  if (mainWindow && logsReady) {
    mainWindow.webContents.send('logs', log)
  } else {
    logQueue.push(log)
  }
}

const Logger = {
  info: msg => {
    log.info(msg)
    sendLog(msg)
  },
  error: msg => {
    log.error(msg)
    sendLog(`ERROR: ${msg}`)
  }
}

ipcMain.on('signed-in', () => {
  console.log('SIGNED IN?')
})

ipcMain.on('logs-ready', () => {
  logQueue.map(line => mainWindow && mainWindow.webContents.send('logs', line))
  logQueue = []
  logsReady = true
})


function createWindow() {
  const options = {
    width: 880,
    height: 635,
    backgroundColor: '#000000',
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

const startLnd = async () => {
  try {
    btcdProcess = await startBtcdProcess({
      isDev,
      logger: Logger,
      btcdSettingsDir,
      miningAddress: BTCD_MINING_ADDRESS
    })
    lndProcess = await startLndProcess({
      isDev,
      lndSettingsDir,
      lndPort: LND_PORT,
      lndPeerPort: LND_PEER_PORT,
      lndRestPort: LND_REST_PORT,
      lndProfilingPort: LND_PROFILING_PORT,
      logger: Logger,
      lndArgs
    })
  } catch (err) {
    Logger.error(`Caught Error When Starting lnd: ${err}`)
  }
}


// TODO: Wait for express server to start (though it should start faster than this...)
app.on('ready', () => {
  createWindow()
  startLnd()
})

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

app.on('open-url', function (ev, redirect) {
  ev.preventDefault()
  mainWindow.focus()
  const token = redirect.replace('neon://redirect?authResponse=', '')
  mainWindow.webContents.send('signed-in', token)
})
