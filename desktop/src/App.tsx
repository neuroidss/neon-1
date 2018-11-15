import * as React from 'react'
import { Provider } from 'mobx-react'
import './config'
import './config/reactotron'
import { setupRootStore } from './setup/setup-root-store'
import { Router } from './Router'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

interface AppState {
  ready: boolean
  store?: any
}

class App extends React.Component<{}, AppState> {
  constructor (props) {
    super(props)
    this.state = { ready: false }
  }

  public async componentDidMount() {
    const store = await setupRootStore({})
    this.setState({ ready: true, store })
  }

  public render() {
    const { ready, store } = this.state
    if (!ready) {
      return ( // TODO
        <div>Loading</div>
      )
    }

    const injectableStores = {
      lndStore: store.lndStore,
      payLnStore: store.payLnStore,
      navStore: store.navStore,
      uiStore: store.uiStore,
      userStore: store.userStore,
      walletStore: store.walletStore,
      paymentStore: store.paymentStore,
      documentVerificationStore: store.documentVerificationStore
    }
    const link = new HttpLink({
      uri: 'http://localhost:4000/graphql',
    })
    
    const cache = new InMemoryCache()
    const client = new ApolloClient({
      link,
      cache
    })
    return (
      <Provider {...injectableStores}>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </Provider>
    )
  }
}

export default App
