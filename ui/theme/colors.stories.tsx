import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../components/presentational/storybook-react'
import { Background } from '../components/atoms/Background'
import { color } from './'

storiesOf('Colors', module)
  .add('Black', () => <Background color={color.black} />)
  .add('Neon Green', () => <Background color={color.neon} />)
