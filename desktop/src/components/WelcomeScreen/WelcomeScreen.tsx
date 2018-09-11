import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { LndStore } from '../../stores/lnd-store'
import { WalletStore } from '../../stores/wallet-store'

export interface WelcomeScreenProps {
  lndStore: LndStore
  walletStore: WalletStore
}

@inject('lndStore', 'walletStore')
@observer
export class WelcomeScreen extends React.Component<WelcomeScreenProps, {}> {

  public async componentDidMount() {
    const { initUnlocker } = this.props.lndStore
    const { init } = this.props.walletStore
    await initUnlocker()
    await init()
  }

  public render() {
    const { unlockerReady } = this.props.lndStore
    const { unlocked } = this.props.walletStore

    return (
      <div>
        <p className="header">Welcome!</p>
        <p className="header">Unlocker ready: {unlockerReady.toString()}</p>
        <p className="header">Wallet unlocked: {unlocked.toString()}</p>
      </div>
    )
  }
}
