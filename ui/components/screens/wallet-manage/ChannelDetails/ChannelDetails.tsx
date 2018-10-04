import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const ChannelDetails = () => (
  <Container>
    <Text preset="title2" text="Funding transaction ID" />
    <Text preset="title2" text="Remote node public key" />
    <Text preset="title2" text="Status" />
    <Text preset="title2" text="Capacity" />
    <Text preset="title2" text="Balance" />
    <Button preset="small" text="Close channel" />
  </Container>
)
