import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Logo } from '@arcadecity/neon-ui'
import { loginStub } from '@arcadecity/neon-core'
import { LndStore } from '../../stores/lnd-store'
import { UserStore } from '../../stores/user-store'
import { WalletStore } from '../../stores/wallet-store'

console.log('Logo is', Logo)
console.log('loginStub is', loginStub)

export interface TestUnlockScreenProps {
  lndStore: LndStore
  userStore: UserStore
  walletStore: WalletStore
}

@inject('lndStore', 'userStore', 'walletStore')
@observer
export class TestUnlockScreen extends React.Component<TestUnlockScreenProps, {}> {

  public async componentDidMount() {
    const { initUnlocker } = this.props.lndStore
    const { init } = this.props.walletStore
    await initUnlocker()
    await init()
  }

  public render() {
    const { unlockerReady } = this.props.lndStore
    const { unlocked } = this.props.walletStore
    const { loginBlockstack } = this.props.userStore

    return (
      <div>
        <p className="header">Welcome!</p>
        <p className="header">Unlocker ready: {unlockerReady.toString()}</p>
        <p className="header">Wallet unlocked: {unlocked.toString()}</p>
        <button onClick={loginBlockstack}>Login with Blockstack</button>
        <button onClick={loginStub}>Fake Login</button>
      </div>
    )
  }
}
