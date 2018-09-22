import './reactotron'

/**
 * @fileOverview this file is used to hardcode default settings for the app.
 */

export const RETRY_DELAY = 1000
export const LND_INIT_DELAY = 5000
export const NOTIFICATION_DELAY = 5000
export const RATE_DELAY = 15 * 60 * 1000
export const PAYMENT_TIMEOUT = 60 * 1000

export const LND_PORT = 10006
export const LND_PEER_PORT = 10016
export const LND_REST_PORT = 8086
export const LND_PROFILING_PORT = 9096
export const NETWORK = 'testnet'
export const BTCD_MINING_ADDRESS = 'rfu4i1Mo2NF7TQsN9bMVLFSojSzcyQCEH5'

const prefixName = 'lightning'
export const PREFIX_NAME = prefixName
export const PREFIX_URI = `${prefixName}:`

export const DEFAULT_ROUTE = 'Welcome'
export const MIN_PASSWORD_LENGTH = 8
export const MAX_LOG_LENGTH = 10000

export const UNITS = {
  sat: { display: 'SAT', displayLong: 'Satoshi', denominator: 1 },
  bit: { display: 'bits', displayLong: 'Bits', denominator: 100 },
  btc: { display: 'BTC', displayLong: 'Bitcoin', denominator: 100000000 },
}
export const FIATS = {
  usd: { display: '$', displayLong: 'US Dollar' },
  eur: { display: '€', displayLong: 'Euro' },
  gbp: { display: '£', displayLong: 'British Pound' },
}
export const DEFAULT_UNIT = 'btc'
export const DEFAULT_FIAT = 'usd'
