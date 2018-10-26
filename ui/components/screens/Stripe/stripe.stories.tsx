import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { Container } from '../../atoms';
import {Stripe} from './stripe';

storiesOf('Stripe')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Stripe />
        </Container>
      </UseCase>
    </Story>
  ))