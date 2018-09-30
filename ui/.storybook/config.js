import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import Container from '../components/presentational/container'
// import '../src/index.css'

addDecorator(story => <Container>{story()}</Container>)

function loadStories() {
  const context = require.context('../theme', true, /.stories.tsx?$/)
  console.log('context:',context)
  context.keys().forEach(context)
}

configure(loadStories, module)
