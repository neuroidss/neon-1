import { TextStyle } from 'react-native'
import { color, spacing } from '../../theme'

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  color: color.text,
  fontFamily: 'monospace',
  fontSize: 14,
  lineHeight: 22
}

const SECONDARY: TextStyle = {
  ...BASE,
  color: color.dim
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: 'bold' } as TextStyle,

  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * Description text that shows up below titles.
   */
  description: { ...SECONDARY, marginBottom: spacing[5] - 2 } as TextStyle,

  /**
   * Detail secondary text.
   */
  detail: { ...BASE, fontSize: 9, lineHeight: 11, fontWeight: '900' } as TextStyle, // fontWeight: '900',

  epic: {
    ...BASE,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 3,
    padding: 30
  } as TextStyle,

  /**
   * Appears below the form field when there is a problem.
   */
  error: {
    ...BASE,
    color: color.error,
    fontSize: 12,
    lineHeight: 14,
    marginTop: spacing[2]
  } as TextStyle,

  /**
   * Header text.
   */
  header: { ...BASE, fontWeight: '900', lineHeight: 16 } as TextStyle,

  /**
   * Labels that appear on forms above the inputs or on buttons.
   */
  label: { ...BASE, lineHeight: 16, fontWeight: 'bold' } as TextStyle, //

  /**
   * Link text.
   */
  link: { ...BASE, color: color.link, fontWeight: '500' } as TextStyle, // fontWeight: '500',

  /**
   * Labels that appear on secondary buttons.
   */
  secondaryLabel: { color: color.secondaryText, fontSize: 16, lineHeight: 30 } as TextStyle,

  /**
   * Section header text.
   */
  sectionHeader: {
    ...SECONDARY,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    lineHeight: 12
  } as TextStyle, //

  /**
   * Small secondary text.
   */
  small: { ...SECONDARY, fontSize: 11, lineHeight: 14 } as TextStyle,

  /**
   * A super bold version of the default text.
   */
  superBold: { ...BASE, fontWeight: '900' } as TextStyle,

  /**
   * Large bold headers.
   */
  title: {
    ...BASE,
    fontSize: 28,
    fontWeight: '900', // iOS. Need separate handling for Android
    lineHeight: 34,
    marginVertical: spacing[2]
  } as TextStyle, // fontWeight: '900',

  /**
   * Medium/large, non-bold
   */
  title2: {
    ...BASE,
    fontSize: 22,
    lineHeight: 28,
    marginVertical: spacing[2]
  } as TextStyle
}

/**
 * A list of preset names.
 */
export type TextPresetNames = keyof typeof presets
