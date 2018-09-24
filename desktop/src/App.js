import { Provider } from 'mobx-react'
import * as React from 'react'
import './config'
// import './App.css'
import { setupRootStore } from './setup/setup-root-store'
import { TestUnlockScreen } from './components/TestUnlockScreen'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ready: false }
  }

  componentDidMount = async () => {
    const store = await setupRootStore({})
    this.setState({ ready: true, store })
  }

  render() {
    const { ready, store } = this.state
    if (!ready) {
      return ( // TODO
        <div>Loading</div>
      )
    }

    const injectableStores = {
      lndStore: store.lndStore,
      payLnStore: store.payLnStore,
      uiStore: store.uiStore,
      userStore: store.userStore,
      walletStore: store.walletStore
    }

    return (
      <Provider {...injectableStores}>
        <TestUnlockScreen />
      </Provider>
    )
  }
}

export default App
