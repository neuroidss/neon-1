import * as React from 'react'
import { Text as ReactNativeText } from 'react-native'
import { presets } from './text.presets'
import { TextProps } from './text.props'
// import { translate } from '../../../i18n'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    animated = false,
    animation,
    preset = 'default',
    tx,
    text = '',
    children,
    style: styleOverride,
    ...rest
  } = props

  let { delay } = props
  if (!delay) {
    delay = 300
  }

  // figure out which content to use
  // const i18nText = tx && translate(tx)
  // const content = i18nText || text || children
  const content = text || children || ''

  // assemble the style
  const presetToUse = presets[preset] || presets.default

  const style = { ...presetToUse, ...styleOverride }
  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  )
}
