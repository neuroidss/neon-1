import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { ButtonProps } from './button.props'
import { viewPresets, textPresets, disabledViewPresets } from './button.presets'
import { Text } from '../Text'

const DEFAULT_ACTIVE_OPACITY: number = 0.6

/**
 * It's a button. That you tap!
 */
export const Button = (props: ButtonProps) => {
  // grab the props
  const {
    preset = 'primary',
    children,
    tx,
    text,
    icon,
    style: styleOverride,
    textStyle: textStyleOverride,
    ...rest
  } = props

  // grab the appropriate preset stuff to use
  const viewPresetToUse = viewPresets[preset] || viewPresets.primary
  const disabledViewPresetToUse = disabledViewPresets[preset] || disabledViewPresets.primary
  const textPresetToUse = textPresets[preset] || textPresets.primary

  // assemble the base TouchableOpacity style
  const setViewStyle = {
    ...viewPresetToUse,
    ...icon ? viewPresets.icon : {},
    ...styleOverride,
    ...props.disabled ? disabledViewPresetToUse : {}
  }

  // assemble the base text style
  const setTextStyle = {
    ...textPresetToUse,
    ...icon ? textPresets.icon : {},
    ...textStyleOverride
  }

  if (children) {
    return (
      <TouchableOpacity activeOpacity={DEFAULT_ACTIVE_OPACITY} {...rest} style={setViewStyle}>
        {children}
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity activeOpacity={DEFAULT_ACTIVE_OPACITY} {...rest} style={setViewStyle}>
        <Text preset="label" tx={tx} text={text} style={setTextStyle} />
      </TouchableOpacity>
    )
  }
}
