import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { Avatar } from './avatar'
import { Container } from '../../atoms'

storiesOf('Avatar')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Avatar />
        </Container>
      </UseCase>
    </Story>
  ))