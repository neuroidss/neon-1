import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '@arcadecity/neon-ui'

export default class App extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>It works.</Text>
        <Button text="neon-ui works!" />
      </View>
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
