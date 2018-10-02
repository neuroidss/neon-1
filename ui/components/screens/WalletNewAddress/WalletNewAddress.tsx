import * as React from 'react'
import { Button, Container, QRCode, Text } from '../../atoms'

export const WalletNewAddress = () => (
  <Container>
    <Text preset="title" text="Your new address" />
    <Text preset="title2" text="Scan the QR code or copy the address to send Bitcoin" />
    <QRCode code='thecode' />
    <Button preset="small" text="Done" />
  </Container>
)
