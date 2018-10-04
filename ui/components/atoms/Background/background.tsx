import * as React from 'react'
import { View, StyleSheet } from 'react-native'

interface BackgroundProps {
  color?: string
  children?: any
  style?: any
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
})

export const Background = (props: BackgroundProps) => (
  <View style={[{ backgroundColor: props.color }, styles.background, props.style]}>
    {props.children}
  </View>
)
