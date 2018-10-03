import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavStore } from '@arcadecity/neon-core'
import { MainSelect } from '@arcadecity/neon-ui'

export interface MainSelectScreenProps {
  navStore: NavStore
}

@inject('navStore')
@observer
export class MainSelectScreen extends React.Component<MainSelectScreenProps, {}> {
  public render() {
    const { setScreen } = this.props.navStore
    return (
      <MainSelect
        navToCreateWallet={() => setScreen('createWallet')}
        navToRestoreWallet={() => setScreen('restoreWallet')}
      />
    )
  }
}
