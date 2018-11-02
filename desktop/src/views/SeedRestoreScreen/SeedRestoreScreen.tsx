import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavStore } from '@arcadecity/neon-core'
import { SeedRestore } from '@arcadecity/neon-ui'

export interface SeedRestoreScreenProps {
  navStore?: NavStore
}

@inject('navStore')
@observer
export class SeedRestoreScreen extends React.Component<SeedRestoreScreenProps, {}> {
  public render() {
    const { 
      navStore: { goBack }
    }  = this.props
    return (
      <div>
        <SeedRestore
          goBack={goBack}
        />
      </div>
    )
  }
}
