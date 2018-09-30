import * as React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    width: '100vw'
  }
})

const Container = ({ children, style }) => (
  <View style={[styles.container, style]}>{children}</View>
)

export default Container
