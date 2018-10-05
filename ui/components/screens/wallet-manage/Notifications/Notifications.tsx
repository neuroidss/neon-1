import * as React from 'react'
import { Container, Text } from '../../../atoms'

export const Notifications = () => (
  <Container>
    <Text preset="title" text="Notifications" />
    <Text preset="title2" text="Type | Time | Description" />
    <Text preset="title2" text="Error | 10/4/18, 3:01:52pm | Oops wat happen | Show error logs" />
    <Text preset="title2" text="Success | 10/4/18, 3:01:52pm | Go you" />
  </Container>
)
