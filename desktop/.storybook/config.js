import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import Container from '../src/components/container'

addDecorator(story => <Container>{story()}</Container>)

function loadStories() {
  const context = require.context('../stories', true, /.stories.tsx?$/)
  context.keys().forEach(context)
}

configure(loadStories, module)