import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../presentational/storybook-react'
import {
  MainSelect,
  PasswordSet,
  SeedRestore,
  SeedShow,
  SeedSuccess,
  SeedVerify,
  Splash,
  WalletNewAddress,
  WalletSyncing
} from './'

const mnemonic = ['empower', 'neglect', 'experience', 'elevator', 'entropy', 'future',
'trust', 'swift', 'pluck', 'easy', 'kite', 'measure', 'engage', 'settle', 'dog',
'manager', 'tool', 'fan', 'neglect', 'conduct', 'blouse', 'stone', 'quit', 'cashew']

storiesOf('Screens')
  .add('Splash', () => (
    <Splash />
  ))
  .add('MainSelect', () => (
    <MainSelect />
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
