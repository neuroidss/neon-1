import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { SeedWord } from './SeedWord'

export const SeedGrid = (props: any) => (
  <View style={listStyles.wrapper}>
    <View style={listStyles.words}>
      {props.mnemonic.map((word, i) => (
        <SeedWord word={word} index={i + 1} key={i} />
      ))}
    </View>
  </View>
)

const listStyles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    margin: 20
  },
  words: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 900
  }
})
