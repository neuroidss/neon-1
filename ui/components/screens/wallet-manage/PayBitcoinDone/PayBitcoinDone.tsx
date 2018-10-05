import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const PayBitcoinDone = () => (
  <Container>
    <Text preset="title2" text="Payment processing" />
    <Button preset="small" text="Done" />
    <Button preset="small" text="Another payment" />
  </Container>
)
