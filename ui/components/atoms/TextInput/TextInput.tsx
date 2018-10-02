// Base Text Input
import * as React from 'react'
import { TextInput as RNTextInput, StyleSheet } from 'react-native'
import { color, typography } from '../../../theme'

const baseStyles = StyleSheet.create({
  input: {
    fontFamily: typography.primary,
    fontSize: 14,
    lineHeight: 16,
    color: color.neon
  }
})

export const TextInput = ({ style, ...props }) => (
  <RNTextInput
    style={[baseStyles.input, style]}
    autoCorrect={false}
    autoCapitalize="none"
    underlineColorAndroid="rgba(0,0,0,0)"
    placeholderTextColor={color.neon}
    {...props}
  />
)
