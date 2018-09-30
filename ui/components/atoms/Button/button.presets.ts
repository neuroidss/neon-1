import { Platform, ViewStyle, TextStyle } from 'react-native'
import { color, spacing } from '../../../theme'

const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  alignSelf: 'stretch',
  minHeight: 50,
  minWidth: 120,
  alignItems: 'center',
  justifyContent: 'center',
  shadowOffset: {
    width: 0,
    height: 6
  },
  shadowOpacity: 1,
  shadowRadius: 12
}

const SMALL_VIEW: ViewStyle = {
  borderRadius: 2,
  alignItems: 'center',
  justifyContent: 'center',
  height: 30
}

const SMALLER_VIEW: ViewStyle = {
  borderRadius: 2,
  alignItems: 'center',
  justifyContent: 'center',
  height: 26
}

const DISABLED_VIEW: ViewStyle = {
  ...BASE_VIEW,
  opacity: 0.8
}

const BASE_TEXT: TextStyle = {
  color: color.text,
  textAlign: 'center',
  paddingHorizontal: spacing[3]
}

/**
 * What the base view looks like.
 */
export const viewPresets = {
  primary: {
    ...BASE_VIEW,
    backgroundColor: color.primary,
    shadowColor: 'rgba(91, 32, 242, 0.2)'
  } as ViewStyle,
  secondary: {
    ...BASE_VIEW,
    backgroundColor: color.secondary,
    shadowColor: 'rgba(120, 101, 182, 0.12)'
  } as ViewStyle,
  highlight: {
    ...BASE_VIEW,
    backgroundColor: color.highlight,
    shadowColor: 'rgba(120, 101, 182, 0.12)'
  } as ViewStyle,
  icon: {
    borderRadius: 23,
    minHeight: 46,
    minWidth: 46,
    height: 46,
    width: 46,
    padding: 0
  } as ViewStyle,
  small: {
    ...SMALL_VIEW
  } as ViewStyle,
  smaller: {
    ...SMALLER_VIEW
  } as ViewStyle
}

/**
 * What the text looks like.
 */
export const textPresets = {
  primary: {
    ...BASE_TEXT
  } as TextStyle,
  secondary: {
    ...BASE_TEXT,
    color: color.secondaryText
  } as TextStyle,
  icon: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: 20
  } as TextStyle,
  small: {
    backgroundColor: color.background,
    borderRadius: 2,
    margin: 1,
    paddingHorizontal: 20,
    ...Platform.select({
      android: {
        paddingVertical: 3 // height: 28, TODO: Figure out why I can't define height here (typescript error).. and does this screw up the look on android
      },
      ios: {
        paddingVertical: 3
      }
    })
  } as TextStyle,
  smaller: {
    backgroundColor: color.background,
    borderRadius: 2,
    margin: 1,
    paddingHorizontal: spacing[4] - 2,
    ...Platform.select({
      android: {
        paddingVertical: 1 // height: 24, TODO: Figure out why I can't define height here (typescript error).. and does this screw up the look on android
      },
      ios: {
        paddingVertical: 1
      }
    })
  } as TextStyle
}

/**
 * What the base view looks like when disabled.
 */
export const disabledViewPresets = {
  primary: {
    ...DISABLED_VIEW,
    backgroundColor: color.primary
  } as ViewStyle,
  secondary: {
    ...DISABLED_VIEW,
    backgroundColor: color.secondary
  } as ViewStyle,
  icon: {
    minHeight: 46,
    minWidth: 46,
    height: 46,
    width: 46,
    borderRadius: 23
  } as ViewStyle,
  small: {
    ...SMALL_VIEW,
    opacity: 0.8
  } as ViewStyle,
  smaller: {
    ...SMALLER_VIEW,
    opacity: 0.8
  } as ViewStyle
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
