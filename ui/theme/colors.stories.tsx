import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../components/presentational/storybook-react'
import { Background } from '../components/atoms/Background'
import { color } from './'

storiesOf('Colors', module)
  .add('Background', () => <Background color={color.background} />)
  .add('Primary', () => <Background color={color.primary} />)
  .add('Secondary', () => <Background color={color.secondary} />)
