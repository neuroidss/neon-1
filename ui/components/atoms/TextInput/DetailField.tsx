import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../'
import { color } from '../../../theme'

const detailStyles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    marginTop: 12,
    borderBottomColor: color.neon,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  name: {
    fontFamily: 'OpenSans Bold',
    fontSize: 12,
    lineHeight: 14,
    color: color.black
  },
  text: {
    fontSize: 12,
    lineHeight: 20,
    color: color.black
  }
})

export const DetailField = ({ name, children, style }) => (
  <View style={[detailStyles.content, style]}>
    <Text style={detailStyles.name}>{name}</Text>
    <Text style={detailStyles.text}>{children}</Text>
  </View>
)
