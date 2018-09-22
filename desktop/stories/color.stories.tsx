// @ts-ignore
import { storiesOf } from './storybook-react'
import * as React from 'react'
import Background from '../src/components/background'
import { colors } from '../src/theme'

storiesOf('Colors', module)
  .add('Background', () => <Background color={colors.background} />)
  .add('Primary', () => <Background color={colors.primary} />)
  .add('Secondary', () => <Background color={colors.secondary} />)
