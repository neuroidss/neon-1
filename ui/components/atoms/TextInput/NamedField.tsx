import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../'
import { color } from '../../../theme'

const namedStyles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: color.black,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  name: {
    color: color.black,
    fontSize: 16,
    lineHeight: 30,
    marginRight: 15
  },
  text: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 30,
    color: color.black,
    opacity: 0.5
  }
})

export const NamedField = ({ name, children, style }) => (
  <View style={[namedStyles.content, style]}>
    <Text style={namedStyles.name}>{name}</Text>
    <Text style={namedStyles.text} numberOfLines={1}>
      {children}
    </Text>
  </View>
)
