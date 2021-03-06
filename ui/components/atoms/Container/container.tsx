import * as React from 'react'
import { StyleSheet, View } from 'react-native'

export const Container = (props: any, children: any) => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }
})
