import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const PayLightningConfirm = () => (
  <Container>
    <Text preset="title" text="Lightning Confirmation" />
    <Text preset="title" text="$0.75" />
    <Text preset="title2" text="Fee: $0.002" />
    <Text preset="title2" text="Total: $0.752" />
    <Text preset="title2" text="Note: Cheap coffee" />
    <Button preset="small" text="Confirm" />
  </Container>
)
