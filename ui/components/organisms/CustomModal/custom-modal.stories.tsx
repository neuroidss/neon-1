import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { CustomModal } from './custom-modal'

storiesOf('CustomModal')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="Simple Modal">
        <CustomModal />
      </UseCase>
    </Story>
  ))