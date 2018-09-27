import * as React from 'react'
import { ButtonProps } from './button.props'
import { Text, TouchableOpacity } from 'react-native'

export const Button = (props: ButtonProps) => (
  <TouchableOpacity {...props} style={{backgroundColor: 'blue', height: 60, width: 200, borderRadius: 10}}>
    <Text style={{color: 'white'}}>Login: FB, Goog, BS, uPort, Anon?</Text>
  </TouchableOpacity>
)
