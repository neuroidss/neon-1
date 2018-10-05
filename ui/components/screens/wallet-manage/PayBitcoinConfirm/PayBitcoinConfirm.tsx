import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const PayBitcoinConfirm = () => (
  <Container>
    <Text preset="title" text="On-Chain Confirmation" />
    <Text preset="title2" text="You are about to send a Bitcoin payment on-chain." />
    <Text preset="title" text="$100.00" />
    <Text preset="title2" text="Fee: $0.25" />
    <Text preset="title2" text="Total: $100.25" />
    <Button preset="small" text="Confirm" />
  </Container>
)
