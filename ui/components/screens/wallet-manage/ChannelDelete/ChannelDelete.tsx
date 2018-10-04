import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const ChannelDelete = () => (
  <Container>
    <Text preset="title" text="Are you sure?" />
    <Text preset="title2" text="If you close this channel, all sending and receiving of funds will be suspended." />
    <Button preset="small" text="Close this channel" />
    <Button preset="small" text="Cancel" />
  </Container>
)
