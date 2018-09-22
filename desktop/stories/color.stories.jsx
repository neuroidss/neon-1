import React from 'react'
import { storiesOf } from './storybook-react'
import Background from '../src/components/background'
import { colors } from '../src/theme'

storiesOf('Colors', module)
  .add('Background', () => <Background color={colors.background} />)
  .add('Primary', () => <Background color={colors.primary} />)
