import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../components/presentational/storybook-react'
import { Background } from '../components/atoms/Background'
import { colors } from './'

storiesOf('Colors', module)
  .add('Background', () => <Background color={colors.background} />)
  .add('Primary', () => <Background color={colors.primary} />)
  .add('Secondary', () => <Background color={colors.secondary} />)
