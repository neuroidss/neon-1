// Base Text Input
import * as React from 'react'
import { TextInput as RNTextInput, StyleSheet } from 'react-native'
import { color, typography } from '../../../theme'

interface TextInputProps {
  style?: any
  value?: any
  onChangeText?: any
}

const baseStyles = StyleSheet.create({
  input: {
    fontFamily: typography.primary,
    fontSize: 14,
    lineHeight: 16,
    color: color.neon
  }
})

export const TextInput = (props: TextInputProps) => (
  <RNTextInput
    style={[baseStyles.input, props.style]}
    autoCorrect={false}
    autoCapitalize="none"
    underlineColorAndroid="rgba(0,0,0,0)"
    placeholderTextColor={color.neon}
    {...props}
  />
)
