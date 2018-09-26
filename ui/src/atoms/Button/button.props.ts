import * as React from 'react'
import { ViewStyle, TouchableOpacityProperties, TextStyle } from 'react-native'
import { ButtonPresetNames } from './button.presets'

export interface ButtonProps extends TouchableOpacityProperties {
  stretch?: boolean

  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * The icon to display if not using `tx`, `text`, or nested components.
   */
  icon?: string

  /**
   * An optional style override for the button's TouchableOpacity
   */
  style?: ViewStyle

  /**
   * An optional style override for nested button text.
   */
  textStyle?: TextStyle

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  /**
   * Children components.
   */
  children?: React.ReactChild
}
