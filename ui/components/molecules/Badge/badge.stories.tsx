import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { Badge } from './badge'
import { Text } from '../../..';

storiesOf('Badge')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Badge', () => (
    <Story>
      <UseCase text="Primary" usage="Badge with text.">
        <Badge>
          <Text>
            Dummy Text
          </Text>
        </Badge>
      </UseCase>
    </Story>
  ))