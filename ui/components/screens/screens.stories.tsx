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
import { EvidentDocumentVerification } from './EvidentDocumentVerification';

const mnemonic = ['empower', 'neglect', 'experience', 'elevator', 'entropy', 'future',
'trust', 'swift', 'pluck', 'easy', 'kite', 'measure', 'engage', 'settle', 'dog',
'manager', 'tool', 'fan', 'neglect', 'conduct', 'blouse', 'stone', 'quit', 'cashew']

const callback = (e) => console.log(e);

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
      disableBackFileInput={true}
      disableFrontFileInput={true}
      handleBackImgChange={callback}
      handleFrontImgChange={callback}
      handleSelfieImgChange={callback}
      handleOpenAlert={callback}
      onPaymentSelectionChange={callback}
      paymentMethodSelection={[]}
      language={'En'}
      supportedIDFormats={''}
      supportedSelfieFormats={''}
      dropDownValue={'Passport'} />
  ))
