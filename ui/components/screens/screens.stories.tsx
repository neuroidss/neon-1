import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../presentational/storybook-react'
import {
  MainSelect,
  PasswordSet,
  SeedRestore,
  SeedSave,
  SeedSuccess,
  SeedVerify,
  Splash,
  WalletNewAddress,
  WalletSyncing
} from './'

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
  .add('SeedSave', () => (
    <SeedSave />
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
    <WalletNewAddress />
  ))
  .add('WalletSyncing', () => (
    <WalletSyncing />
  ))
