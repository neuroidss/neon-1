import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '../../atoms'
import { color } from '../../../theme'

const wordStyles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    height: 35,
    width: 130,
    margin: 5,
    borderWidth: 1,
    borderColor: color.neon,
    backgroundColor: color.black
  }
})

export const SeedWord = ({ word, index }) => (
  <View style={wordStyles.wrapper}>
    <Text preset="seed">
      {index}. {word}
    </Text>
  </View>
)
