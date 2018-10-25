import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { Badge } from './badge'
import { Text, Background } from '../../..';
import { color } from '../../../theme';

storiesOf('Badge')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Badge', () => (
    <Story>
      <UseCase text="Primary" usage="Badge with text.">
        <Background color={color.neon}>
          <Badge>
            <Text>
              Dummy Text
            </Text>
          </Badge>
        </Background>
      </UseCase>
    </Story>
  ))