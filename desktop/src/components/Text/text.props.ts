import { TextProperties, TextStyle } from 'react-native'
import { TextPresetNames } from './text.presets'

// hack around poorly defined TextStyle
export interface AnimatedTextStyle extends TextStyle {
  backgroundColor?: any
  color?: any
}

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: AnimatedTextStyle

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresetNames

  /**
   * Should we use animated text?
   */
  animated?: boolean

  /**
   * If animated, what animation?
   */
  animation?: string

  /**
   * If animated, any easing?
   * and theres more, may need to add others here later.
   * https://github.com/oblador/react-native-animatable
   */
  easing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "ease-in-cubic" | "ease-out-cubic"

  delay?: number
}
