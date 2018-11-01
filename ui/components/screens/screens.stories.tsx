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
import { EvidentDocumentVerification } from './EvidentDocumentVerification'

const mnemonic = ['empower', 'neglect', 'experience', 'elevator', 'entropy', 'future',
'trust', 'swift', 'pluck', 'easy', 'kite', 'measure', 'engage', 'settle', 'dog',
'manager', 'tool', 'fan', 'neglect', 'conduct', 'blouse', 'stone', 'quit', 'cashew']

export const documentMethod = [{
  id: 1,
  name: 'Drivers License'
},
{
  id: 2,
  name: 'Passport'
}, {
  id: 3,
  name: 'SSN'
}]

let disabled = false

const callback = (e) => console.log(e)

storiesOf('Screens')
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
  .add('Document Verification', () => (
    <EvidentDocumentVerification 
      closeDocumentVerificationModal={callback}
      documentMethod={documentMethod}
      disableBackFileInput={disabled}
      disableFrontFileInput={disabled}
      handleBackImgChange={callback}
      handleFrontImgChange={callback}
      handleSelfieImgChange={callback}
      handleOpenAlert={callback}
      onPaymentSelectionChange={callback}
      language={'En'}
      supportedIDFormats={''}
      supportedSelfieFormats={''}
      dropDownValue={'Drivers License'} />
  ))
