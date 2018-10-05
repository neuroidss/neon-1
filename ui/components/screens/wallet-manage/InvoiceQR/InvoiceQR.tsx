import * as React from 'react'
import { Button, Container, QRCode, Text } from '../../../atoms'

interface WalletNewAddressProps {
  code: string
}

export const InvoiceQR = (props: WalletNewAddressProps) => (
  <Container>
    <Text preset="title" text="Payment Request" />
    <Text preset="title2" text="$0.46" />
    <Text preset="title2" text="Note: Coffee" />
    <QRCode code={props.code} size={160} />
    <Text preset="title2" text={props.code} />
    <Button preset="small" text="Done" />
  </Container>
)
