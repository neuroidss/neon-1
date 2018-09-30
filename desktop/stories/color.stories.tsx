// @ts-ignore
import { storiesOf } from './storybook-react'
import * as React from 'react'
import Background from '../src/components/background'
import { color } from '../src/theme'

storiesOf('Colors', module)
  .add('Background', () => <Background color={color.background} />)
  .add('Primary', () => <Background color={color.primary} />)
  .add('Secondary', () => <Background color={color.secondary} />)
