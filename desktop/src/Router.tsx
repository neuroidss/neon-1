import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavStore } from '@arcadecity/neon-core'
import {
  MainSelectScreen,
  SeedRestoreScreen,
  SeedShowScreen,
  PaymentScreen,
  DocumentVerification
} from './views'

interface RouterProps {
  navStore?: NavStore
}

@inject('navStore')
@observer
export class Router extends React.Component<RouterProps, {}> {
  public render() {
    let screenComponent
    const { screen } = this.props.navStore

    switch (screen) {
      case 'seedShow':
        screenComponent = <SeedShowScreen />
        break
      case 'seedRestore':
        screenComponent = <SeedRestoreScreen />
        break
      case 'paymentScreen':
        screenComponent = <PaymentScreen />
        break
      case 'documentScreen':
        screenComponent = <DocumentVerification />
        break
      default:
        screenComponent = <MainSelectScreen />
    }

    return screenComponent
  }
}
