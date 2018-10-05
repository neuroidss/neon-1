import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavStore } from '@arcadecity/neon-core'
import { Loading, SeedShow } from '@arcadecity/neon-ui'
import { WalletStore } from '../../stores/wallet-store'

export interface SeedShowScreenProps {
  navStore?: NavStore
  walletStore?: WalletStore
}

@inject('navStore', 'walletStore')
@observer
export class SeedShowScreen extends React.Component<SeedShowScreenProps, {}> {

  public componentWillMount() {
    // @ts-ignore
    const { generateSeed, seedMnemonic } = this.props.walletStore
    if (seedMnemonic.length === 0) {
      generateSeed()
    }
  }

  public render() {
    // @ts-ignore
    const { seedMnemonic } = this.props.walletStore
    const { goBack } = this.props.navStore

    if (seedMnemonic.length === 0) {
      return (
        <Loading
          text="Creating recovery phrase"
        />
      )
    }

    return (
      <SeedShow
        mnemonic={seedMnemonic}
        goBack={goBack}
      />
    )
  }
}
