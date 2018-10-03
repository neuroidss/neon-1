import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { NavStore } from '@arcadecity/neon-core'
import {
  MainSelectScreen,
  SeedShowScreen
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
      case 'createWallet':
        screenComponent = <SeedShowScreen />
        break
      default:
        screenComponent = <MainSelectScreen />
    }

    return screenComponent
  }
}
