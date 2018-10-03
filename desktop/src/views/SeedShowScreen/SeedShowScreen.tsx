import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavStore } from '@arcadecity/neon-core'
import { SeedShow } from '@arcadecity/neon-ui'

export interface SeedShowScreenProps {
  navStore?: NavStore
}

const mnemonic = ['empower', 'neglect', 'experience', 'elevator', 'entropy', 'future',
'trust', 'swift', 'pluck', 'easy', 'kite', 'measure', 'engage', 'settle', 'dog',
'manager', 'tool', 'fan', 'neglect', 'conduct', 'blouse', 'stone', 'quit', 'cashew']

@inject('navStore')
@observer
export class SeedShowScreen extends React.Component<SeedShowScreenProps, {}> {
  public render() {
    // const { setScreen } = this.props.navStore
    return (
      <SeedShow
        mnemonic={mnemonic}
      />
    )
  }
}
