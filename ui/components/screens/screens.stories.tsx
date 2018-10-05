import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../presentational/storybook-react'
import {
  MainSelect, PasswordRestore, PasswordSet, SeedRestore, SeedShow, SeedSuccess,
  SeedVerify, Splash, WalletNewAddress, WalletSyncing
} from './wallet-onboarding'
import {
  ChannelCreate, ChannelDelete, ChannelDetails, Channels, ChannelsOpening, CLI,
  Deposit, Home, Invoice, InvoiceQR, Notifications, PayBitcoin, PayBitcoinConfirm,
  PayBitcoinDone, PayLightning, PayLightningConfirm, PayLightningDone, PaymentFailed,
  Settings, SettingsFiat, SettingsUnits, TransactionDetails, Transactions
} from './wallet-manage'

const mnemonic = ['empower', 'neglect', 'experience', 'elevator', 'entropy', 'future',
'trust', 'swift', 'pluck', 'easy', 'kite', 'measure', 'engage', 'settle', 'dog',
'manager', 'tool', 'fan', 'neglect', 'conduct', 'blouse', 'stone', 'quit', 'cashew']

storiesOf('Screens (Onboarding)')
  .add('Splash', () => (
    <Splash />
  ))
  .add('MainSelect', () => (
    <MainSelect
      navToCreateWallet={() => alert('Nav to seedShow')}
      navToRestoreWallet={() => alert('Nav to seedRestore')}
    />
  ))
  .add('SeedRestore', () => (
    <SeedRestore />
  ))
  .add('SeedShow', () => (
    <SeedShow
      mnemonic={mnemonic}
    />
  ))
  .add('SeedVerify', () => (
    <SeedVerify />
  ))
  .add('PasswordRestore', () => (
    <PasswordRestore />
  ))
  .add('PasswordSet', () => (
    <PasswordSet />
  ))
  .add('SeedSuccess', () => (
    <SeedSuccess />
  ))
  .add('WalletNewAddress', () => (
    <WalletNewAddress
      code={'bitcoin:ra2XT898gWTp9q2DwMgtwMJsUEh3oMeS4K'}
    />
  ))
  .add('WalletSyncing', () => (
    <WalletSyncing />
  ))

storiesOf('Screens (Wallet)')
  .add('ChannelCreate', () => (
    <ChannelCreate />
  ))
  .add('ChannelDelete', () => (
    <ChannelDelete />
  ))
  .add('ChannelDetails', () => (
    <ChannelDetails />
  ))
  .add('Channels', () => (
    <Channels />
  ))
  .add('ChannelsOpening', () => (
    <ChannelsOpening />
  ))
  .add('CLI', () => (
    <CLI />
  ))
  .add('Deposit', () => (
    <Deposit
      code={'bitcoin:ra2XT898gWTp9q2DwMgtwMJsUEh3oMeS4K'}
    />
  ))
  .add('Home', () => (
    <Home />
  ))
  .add('Invoice', () => (
    <Invoice />
  ))
  .add('InvoiceQR', () => (
    <InvoiceQR
      code={'bitcoin:ra2XT898gWTp9q2DwMgtwMJsUEh3oMeS4K'}
    />
  ))
  .add('Notifications', () => (
    <Notifications />
  ))
  .add('PayBitcoin', () => (
    <PayBitcoin />
  ))
  .add('PayBitcoinConfirm', () => (
    <PayBitcoinConfirm />
  ))
  .add('PayBitcoinDone', () => (
    <PayBitcoinDone />
  ))
  .add('PayLightning', () => (
    <PayLightning />
  ))
  .add('PayLightningConfirm', () => (
    <PayLightningConfirm />
  ))
  .add('PayLightningDone', () => (
    <PayLightningDone />
  ))
  .add('PaymentFailed', () => (
    <PaymentFailed />
  ))
  .add('Settings', () => (
    <Settings />
  ))
  .add('SettingsFiat', () => (
    <SettingsFiat />
  ))
  .add('SettingsUnits', () => (
    <SettingsUnits />
  ))
  .add('TransactionDetails', () => (
    <TransactionDetails />
  ))
  .add('Transactions', () => (
    <Transactions />
  ))
