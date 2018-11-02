import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavStore } from '@arcadecity/neon-core'
import { MainSelect } from '@arcadecity/neon-ui'
import { LndStore } from '../../stores/lnd-store'
import { WalletStore } from '../../stores/wallet-store'

export interface MainSelectScreenProps {
  lndStore?: LndStore
  navStore?: NavStore
  walletStore?: WalletStore
}

@inject('lndStore', 'navStore', 'walletStore')
@observer
export class MainSelectScreen extends React.Component<MainSelectScreenProps, {}> {
  public async componentDidMount() {
    // @ts-ignore
    const { initUnlocker } = this.props.lndStore
    // @ts-ignore
    const { init } = this.props.walletStore
    await initUnlocker()
    await init()
  }

  public render() {
    const { setScreen } = this.props.navStore
    return (
      <MainSelect
        navToCreateWallet={() => setScreen('seedShow')}
        navToRestoreWallet={() => setScreen('seedRestore')}
        navToPaymentScreen={() => setScreen('paymentScreen')}
      />
    )
  }
}
