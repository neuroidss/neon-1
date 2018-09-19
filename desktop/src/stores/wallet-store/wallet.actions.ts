import { getRoot } from 'mobx-state-tree'
// import { toBuffer, parseSat, checkHttpStatus, nap, poll } from '../../helper'
import { parseSat, toBuffer } from '../../helper'

/**
 * Check the wallet password that was chosen by the user has the correct
 * length and that it was also entered correctly twice to make sure that
 * there was no typo.
 * @return {Promise<boolean>}
 */
export async function checkNewPassword(self) {
  // const { password, passwordVerify } = this._store.wallet
  // if (!password || password.length < MIN_PASSWORD_LENGTH) {
  //   return this._notification.display({
  //     msg: `Set a password with at least ${MIN_PASSWORD_LENGTH} characters.`,
  //   })
  // }
  // if (password !== passwordVerify) {
  //   return this._notification.display({ msg: 'Passwords do not match!' })
  // }
  // await this.initWallet({
  //   walletPassword: password,
  //   seedMnemonic: this._store.seedMnemonic.toJSON(),
  // })
  return true
}


/**
 * Check the password input by the user by attempting to unlock the wallet.
 * @return {Promise<undefined>}
 */
export async function checkPassword(self) {
  // const { password } = this._store.wallet
  // await this.unlockWallet({ walletPassword: password })
  return true
}


/**
 * Verify that the user has written down the generated seed correctly by
 * checking three random seed words. If the match continue to setting the
 * wallet password.
 * @return {Promise<boolean>}
 */
export async function checkSeed(selfself) {
  // const {
  //   wallet: { seedVerify },
  //   seedMnemonic,
  //   seedVerifyIndexes,
  // } = this._store
  // if (
  //   seedVerify[0] !== seedMnemonic[seedVerifyIndexes[0] - 1] ||
  //   seedVerify[1] !== seedMnemonic[seedVerifyIndexes[1] - 1] ||
  //   seedVerify[2] !== seedMnemonic[seedVerifyIndexes[2] - 1]
  // ) {
  //   return this._notification.display({ msg: 'Seed words do not match!' })
  // }
  // this.initSetPassword()
  return true
}


/**
 * Generate a new wallet seed. This needs to be done the first time the
 * app is started.
 * @return {Promise<boolean>}
 */
export async function generateSeed(self) {
  const root = getRoot(self) as any
  const { sendUnlockerCommand } = root.lndStore
  const response = await sendUnlockerCommand('GenSeed')
  self.setSeedMnemonic(response.cipher_seed_mnemonic)
  return true
}


/**
 * Fetch the on-chain wallet balances using the lnd grpc api and set the
 * corresponding values on the global store.
 * @return {Promise<undefined>}
 */
export async function getBalance(self) {
  try {
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const r = await sendCommand('WalletBalance')
    self.setBalanceSatoshis(parseSat(r.total_balance))
    self.setBalanceConfirmedSatoshis(parseSat(r.confirmed_balance))
    self.setBalanceUnconfirmedSatoshis(parseSat(r.unconfirmed_balance))
  } catch (err) {
    console.log('Getting wallet balance failed', err)
  }
  return true
}


/**
 * Fetch the lightning channel balances using the lnd grpc api and set the
 * corresponding values on the global store.
 * @return {Promise<undefined>}
 */
export async function getChannelBalance(self) {
  try {
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const r = await sendCommand('ChannelBalance')
    self.setChannelBalanceSatoshis(parseSat(r.balance))
    self.setChannelPendingBalanceSatoshis(parseSat(r.pending_open_balance))
  } catch (err) {
    console.log('Getting channel balance failed', err)
  }
  return true
}


/**
 * Fetch a current btc/fiat exchange rate based on the currently selected
 * fiat currency and persist the value on disk for the next time the app
 * starts up.
 * @return {Promise<undefined>}
 */
export async function getExchangeRate(self) {
  // try {
  //   const fiat = this._store.settings.fiat
  //   const uri = `https://blockchain.info/tobtc?currency=${fiat}&value=1`
  //   const response = checkHttpStatus(await fetch(uri))
  //   this._store.settings.exchangeRate[fiat] = Number(await response.text())
  //   this._db.save()
  // } catch (err) {
  //   log.error('Getting exchange rate failed', err)
  // }
  return true
}


/**
 * Fetch a new on-chain bitcoin address which can be used to fund the wallet
 * or receive an on-chain transaction from another user.
 * @return {Promise<undefined>}
 */
export async function getNewAddress(self) {
  // - `p2wkh`: Pay to witness key hash (`WITNESS_PUBKEY_HASH` = 0)
  // - `np2wkh`: Pay to nested witness key hash (`NESTED_PUBKEY_HASH` = 1)
  // - `p2pkh`:  Pay to public key hash (`PUBKEY_HASH` = 2)
  try {
    const root = getRoot(self) as any
    const { sendCommand } = root.lndStore
    const { address } = await sendCommand('NewAddress', {
      type: 1
    })
    self.setAddress(address)
  } catch (err) {
    console.tron.log('Getting new wallet address failed', err)
  }
  return true
}


/**
 * Initialize the wallet by trying to generate a new seed. If seed
 * generation in lnd fails, the app assumes a wallet already exists
 * and wallet unlock via password input will be initiated.
 * @return {Promise<undefined>}
 */
export async function init(self) {
  try {
    await self.generateSeed()
    await self.initWallet('bitconneeeeeect', self.seedMnemonic.toJSON())
    // this._store.firstStart = true
    // this._nav.goLoader()
    // await nap(NOTIFICATION_DELAY)
    // this._nav.goSeed()
  } catch (err) {
    console.tron.log('Seed generation failed, assuming wallet exists...')
    self.initPassword()
  }
  return true
}


/**
 * Ensure that the wallet address is non-null before navigating to the
 * NewAddress view during onboarding.
 * This is necessary because the wallet address may be null if neutrino
 * has not started syncing by the time the user finishes verifying
 * their seed.
 * @return {undefined}
 */
export async function initInitialDeposit(self) {
  // if (this._store.walletAddress) {
  //   this._nav.goNewAddress()
  // } else {
  //   this._nav.goWait()
  //   when(
  //     () => typeof this._store.walletAddress === 'string',
  //     () => this._nav.goNewAddress()
  //   )
  // }
  return true
}


/**
 * Initialize the password view by resetting input values
 * and then navigating to the view.
 * @return {undefined}
 */
export async function initPassword(self) {
  // this._store.wallet.password = ''
  // this._nav.goPassword()

  // TODO: Detect if already unlocked

  // For now skip straight to wallet unlocking
  try {
    await self.unlockWallet('bitconneeeeeect')

    // this._store.firstStart = true
    // this._nav.goLoader()
    // await nap(NOTIFICATION_DELAY)
    // this._nav.goSeed()
  } catch (err) {
    console.tron.log('Wallet unlocking failed with error:')
    console.tron.log(err)
  }

  return true
}


/**
 * Initialize the seed verify view by resetting input values
 * and then navigating to the view.
 * @return {undefined}
 */
export async function initSeedVerify(self) {
  // this._store.wallet.seedVerify = ['', '', '']
  // this._nav.goSeedVerify()
  return true
}


/**
 * Initialize the set password view by resetting input values
 * and then navigating to the view.
 * @return {undefined}
 */
export async function initSetPassword(self) {
  // this._store.wallet.password = ''
  // this._store.wallet.passwordVerify = ''
  // this._nav.goSetPassword()
  return true
}


/**
 * Initiate the lnd wallet using the generated seed and password. If this
 * is success set `walletUnlocked` to true and navigate to the seed success
 * screen.
 * @param  {string} options.walletPassword The user chosen password
 * @param  {Array}  options.seedMnemonic   The seed words to generate the wallet
 * @return {Promise<undefined>}
 */
export async function initWallet(self, walletPassword, seedMnemonic) {
  const root = getRoot(self) as any
  const { sendUnlockerCommand } = root.lndStore
  try {
    await sendUnlockerCommand('InitWallet', {
      wallet_password: toBuffer(walletPassword),
      cipher_seed_mnemonic: seedMnemonic,
    })

    const { setUnlocked } = root.walletStore
    setUnlocked(true)

  } catch (err) {
    console.tron.log('Initializing wallet failed with error:')
    console.tron.log(err)
    // this._notification.display({ msg: 'Initializing wallet failed', err })
  }
  return true
}


/**
 * Poll the wallet balances in the background since there is no streaming
 * grpc api yet
 * @return {Promise<undefined>}
 */
export async function pollBalances(self) {
  // await poll(() => this.update())
  return true
}


/**
 * Poll for the current btc/fiat exchange rate based on the currently selected
 * fiat currency every 15 minutes.
 * @return {Promise<undefined>}
 */
export async function pollExchangeRate(self) {
  // await poll(() => this.getExchangeRate(), RATE_DELAY)
  return true
}


/**
 * Unlock the wallet by calling the grpc api with the user chosen password.
 * @param  {string} options.walletPassword The password used to encrypt the wallet
 * @return {Promise<undefined>}
 */
export async function unlockWallet(self, walletPassword) {
  try {
    const root = getRoot(self) as any
    const { sendUnlockerCommand } = root.lndStore
    const { setUnlocked } = root.walletStore
    await sendUnlockerCommand('UnlockWallet', {
      wallet_password: toBuffer(walletPassword),
    })
    setUnlocked(true)
  } catch (err) {
    // this._notification.display({ type: 'error', msg: 'Invalid password' })
    if (err.code === 12) {
      console.tron.log('Wallet already unlocked')
    } else {
      return false
      console.tron.log('unlockWallet error:', err)
    }
  }
  return true
}


/**
 * Update the wallet on-chain and channel balances.
 * @return {Promise<undefined>}
 */
export async function update(self) {
  // await Promise.all([this.getBalance(), this.getChannelBalance()])
  return true
}
