import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Background } from '../Background'
import { Logo } from './'

storiesOf('Logo', module)
  .add('Centered on black background', () => (
    <Background color='#000' style={{justifyContent: 'center', alignItems: 'center'}}>
      <Logo />
    </Background>
  ))
