import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import Container from '../components/presentational/container'
// import '../src/index.css'

addDecorator(story => <Container>{story()}</Container>)

function loadStories() {
  const context = require.context('..', true, /.stories.tsx?$/)
  console.log('context:', context)
  console.log('type:', typeof context)
  context.keys().forEach(context)
}

configure(loadStories, module)
