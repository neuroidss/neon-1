import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { MainSelect } from '@arcadecity/neon-ui'
import { loginStub } from '@arcadecity/neon-core'
import { LndStore } from '../../stores/lnd-store'
import { UserStore } from '../../stores/user-store'
import { WalletStore } from '../../stores/wallet-store'

export interface MainSelectScreenProps {
  lndStore: LndStore
  userStore: UserStore
  walletStore: WalletStore
}

@inject('lndStore', 'userStore', 'walletStore')
@observer
export class MainSelectScreen extends React.Component<MainSelectScreenProps, {}> {

  public async componentDidMount() {
    const { initUnlocker } = this.props.lndStore
    const { init } = this.props.walletStore
    await initUnlocker()
    await init()
    loginStub()
  }

  public render() {
    console.log('MainSelectScreen props:', this.props)
    // const { unlockerReady } = this.props.lndStore
    // const { unlocked } = this.props.walletStore
    // const { loginBlockstack } = this.props.userStore

    return (
      <MainSelect />
    )
  }
}
