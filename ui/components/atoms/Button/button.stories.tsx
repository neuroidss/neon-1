import * as React from 'react'
// @ts-ignore
import { storiesOf } from '../../presentational/storybook-react'
import { Story, UseCase } from '../../presentational'
import { Button } from './'
import { Text } from '../Text'

storiesOf('Button')
  // .addDecorator(fn => <StoryScreen text="Button">{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <Button
          text="Click Me"
          preset="primary"
          onPress={() => window.alert("I'm the important one.")}
        />
      </UseCase>
      <UseCase text="Secondary" usage="The secondary button.">
        <Button
          text="Click Me Too"
          preset="secondary"
          onPress={() => window.alert('I still matter though.')}
        />
      </UseCase>
      <UseCase text="Disabled" usage="The disabled behaviour of the primary button.">
        <Button text="Can't Click Me" preset="primary" onPress={() => true} disabled />
      </UseCase>
      <UseCase text="Icon Primary" usage="The primary icon button.">
        <Button icon="list-ul" preset="primary" onPress={() => window.alert("I'm iconic.")} />
      </UseCase>
      <UseCase text="Icon Secondary" usage="The secondary icon button.">
        <Button
          icon="list-ul"
          preset="secondary"
          onPress={() => window.alert("I'm an iconoclast.")}
        />
      </UseCase>
      <UseCase text="Small" usage="The small button." style={{ alignItems: 'center' }}>
        <Button text="Colorful click" preset="small" onPress={() => window.alert("I'm tiny.")} />
      </UseCase>
      <UseCase text="Smaller" usage="The smaller button." style={{ alignItems: 'center' }}>
        <Button
          text="Tiny but colorful click"
          preset="smaller"
          onPress={() => window.alert("I'm the smallest.")}
        />
      </UseCase>
    </Story>
  ))
  .add('Style Overrides', () => (
    <Story>
      <UseCase text="Container" usage="The container style overrides.">
        <Button
          text="Click It"
          style={{
            backgroundColor: 'rebeccapurple',
            borderWidth: 10,
            borderRadius: 4,
            borderColor: 'hotpink',
          }}
          onPress={() => true}
        />
      </UseCase>
      <UseCase text="Text" usage="The text style overrides.">
        <Button
          text="Click It"
          textStyle={{
            color: 'hotpink',
            fontSize: 24,
            fontWeight: '900',
          }}
          onPress={() => true}
        />
      </UseCase>
    </Story>
  ))
  .add('Passing Content', () => (
    <Story>
      <UseCase
        text="text"
        usage="Used when you want to pass a value but don't want to open a child."
      >
        <Button text="Click It" onPress={() => true} />
      </UseCase>
      <UseCase text="tx" usage="Used for looking up i18n keys [not yet implemented]">
        <Button tx="common.ok" onPress={() => true} />
      </UseCase>
      <UseCase text="nested children" usage="You can embed them and change styles too.">
        <Button onPress={() => true}>
          <Text text="Click Here!" />
        </Button>
      </UseCase>
    </Story>
  ))
