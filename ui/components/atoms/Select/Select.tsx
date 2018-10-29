import * as React from 'react'
import { StyleSheet, Picker } from 'react-native'
import { color, typography } from '../../../theme'
import { PickerProps } from 'react-native';

interface InputFieldProps extends PickerProps {
  style?: any,
  options: any[],
  placeholder: string
}

const selectStyles = StyleSheet.create({
  select: {
    textAlign: 'center',
    color: color.neon,
    fontFamily: typography.primary,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export const Select = ({ style, placeholder = 'Please select an option', options = [], ...props }:InputFieldProps) => (
  <Picker
    style={[selectStyles.select, style]} {...props}>
      <Picker.Item value='' label={placeholder} />
      {
          options.length && options.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} />)
      }
  </Picker>
)
