import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import Container from '../components/presentational/container'

addDecorator(story => <Container>{story()}</Container>)

function loadStories() {
  const context = require.context('..', true, /.stories.tsx?$/)
  context.keys().forEach(context)
}

configure(loadStories, module)
