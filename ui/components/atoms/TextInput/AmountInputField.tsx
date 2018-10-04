import * as React from 'react'
import { StyleSheet } from 'react-native'
import { HorizontalExpandingTextInput } from './'
import { color, typography } from '../../../theme'

const amountStyles = StyleSheet.create({
  input: {
    textAlign: 'right',
    fontFamily: typography.primary,
    fontSize: 14
  }
})

export const AmountInputField = (props: any) => (
  <HorizontalExpandingTextInput
    style={[amountStyles.input, props.style]}
    charWidth={46}
    keyboardType="numeric"
    placeholder="0"
    placeholderTextColor={color.black}
    {...props}
  />
)
