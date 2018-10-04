import * as React from 'react'
import { Button, Container, Text } from '../../atoms'

export const SeedSuccess = () => (
  <Container>
    <Text preset="title" text="Wallet created successfully" />
    <Text preset="title2" text="Now let's add some coin into your wallet" />
    <Button preset="small" text="Next" />
  </Container>
)
