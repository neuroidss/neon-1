import * as React from 'react'
import { Container, Text } from '../../../atoms'

export const TransactionDetails = () => (
  <Container>
    <Text preset="title2" text="Transaction ID" />
    <Text preset="title2" text="Type" />
    <Text preset="title2" text="Date" />
    <Text preset="title2" text="Amount" />
    <Text preset="title2" text="Fee" />
    <Text preset="title2" text="Confirmations" />
    <Text preset="title2" text="Status" />
  </Container>
)
