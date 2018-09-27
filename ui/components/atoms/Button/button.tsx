import * as React from 'react'
import { ButtonProps } from './button.props'
import { Text } from 'react-native'

export function Button(props: ButtonProps) {
  return (
    <Text style={{color: 'white'}}>This is almost a button</Text>
  )
}
