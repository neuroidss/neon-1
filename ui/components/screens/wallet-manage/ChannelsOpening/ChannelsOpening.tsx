import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const ChannelsOpening = () => (
  <Container>
    <Text preset="title" text="Opening Channels" />
    <Text preset="title2" text="The autopilot feature will open channels for you, but
you can add your own at any time." />
    <Button preset="small" text="Add" />
  </Container>
)
