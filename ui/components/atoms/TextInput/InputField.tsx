import * as React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from './'
import { color, typography } from '../../../theme'

interface InputFieldProps {
  style?: any
  placeholder?: string
}

const inputStyles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    textAlign: 'center',
    color: color.neon,
    fontFamily: typography.primary,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export const InputField = (props: InputFieldProps) => (
  <TextInput style={[inputStyles.input, props.style]} {...props} />
)
