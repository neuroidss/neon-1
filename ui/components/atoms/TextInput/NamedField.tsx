import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../'
import { color } from '../../../theme'

interface NamedFieldProps {
  name: string
  children: any
  style: any
}

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

export const NamedField = (props: NamedFieldProps) => (
  <View style={[namedStyles.content, props.style]}>
    <Text style={namedStyles.name}>{props.name}</Text>
    <Text style={namedStyles.text} numberOfLines={1}>
      {props.children}
    </Text>
  </View>
)
