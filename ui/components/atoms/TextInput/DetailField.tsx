import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../'
import { color } from '../../../theme'

interface DetailFieldProps {
  name: string,
  children: any,
  style: any
}

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

export const DetailField = (props: DetailFieldProps) => (
  <View style={[detailStyles.content, props.style]}>
    <Text style={detailStyles.name}>{props.name}</Text>
    <Text style={detailStyles.text}>{props.children}</Text>
  </View>
)
