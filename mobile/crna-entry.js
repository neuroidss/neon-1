import App from './App'
import Expo from 'expo'
import * as React from 'react'

const AwakeInDevApp = props => [
  <App key="app" {...props} />,
  process.env.NODE_ENV === 'development' ? (
    <Expo.KeepAwake key="keep-awake" />
  ) : null,
]
Expo.registerRootComponent(AwakeInDevApp)
