import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const PayLightningDone = () => (
  <Container>
    <Text preset="title2" text="Payment sent" />
    <Button preset="small" text="Done" />
    <Button preset="small" text="Another payment" />
  </Container>
)
