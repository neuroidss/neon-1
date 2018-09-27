import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Button, Logo } from '@arcadecity/neon-ui'
import { loginStub } from '@arcadecity/neon-core'

export function SplashScreen(props: any) {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>splaaaaash</Text>
      <Button onPress={loginStub} />
    </View>
  )
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
