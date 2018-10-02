import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { InputField, Text } from '../../atoms'
import { color } from '../../../theme'

interface SeedEntryProps {
  seedIndex: number
}

const entryStyles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    borderBottomColor: color.neon,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  index: {
    color: color.neon,
    fontSize: 16,
    lineHeight: 18,
    width: 35
  },
  input: {
    flex: 1,
    textAlign: 'left',
    borderBottomWidth: 0
  }
})

export const SeedEntry = (props: SeedEntryProps) => (
  <View style={entryStyles.wrapper}>
    <Text style={entryStyles.index}>{props.seedIndex}.</Text>
    <InputField style={entryStyles.input} />
  </View>
)
