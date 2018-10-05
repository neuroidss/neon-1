import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '@arcadecity/neon-ui'
import test from '@arcadecity/neon-core/test'
import { SplashScreen } from './src/views/splash'

export default class App extends React.Component<{}> {
  render() {
    return (
      <SplashScreen />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Courier',
    color: '#fff'
  }
})
