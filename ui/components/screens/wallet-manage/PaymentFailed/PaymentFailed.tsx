import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const PaymentFailed = () => (
  <Container>
    <Text preset="title2" text="Payment failed" />
    <Button preset="small" text="Create channel" />
    <Button preset="small" text="Try again" />
  </Container>
)
