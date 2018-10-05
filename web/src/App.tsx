import * as React from 'react'
import './App.css'

import { loginStub } from '@arcadecity/neon-core'
import { Loading } from '@arcadecity/neon-ui'

class App extends React.Component {
  public render() {
    loginStub()
    return (
      <Loading text="yo" />
    )
  }
}

export default App
