import * as React from 'react'
import { Button, Container, QRCode, Text } from '../../../atoms'

interface WalletNewAddressProps {
  code: string
}

export const WalletNewAddress = (props: WalletNewAddressProps) => (
  <Container>
    <Text preset="title" text="Your new address" />
    <Text preset="title2" text="Scan the QR code or copy the address to send Bitcoin" />
    <QRCode code={props.code} size={160} />
    <Text preset="title2" text={props.code} />
    <Button preset="small" text="Done" />
  </Container>
)
