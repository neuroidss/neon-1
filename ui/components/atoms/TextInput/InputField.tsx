import * as React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from './'

const inputStyles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    textAlign: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export const InputField = ({ style, ...props }) => (
  <TextInput style={[inputStyles.input, style]} {...props} />
)
