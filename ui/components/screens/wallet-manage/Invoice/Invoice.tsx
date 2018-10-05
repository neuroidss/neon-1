import * as React from 'react'
import { Button, Container, InputField, Text } from '../../../atoms'

export const Invoice = () => (
  <Container>
    <Text preset="title" text="Payment Request" />
    <Text preset="title2" text="Generate a payment request that others can use to pay you immediately via the Lightning Network." />
    <InputField placeholder="0.451892" />
    <InputField placeholder="Coffee" />
    <Button preset="small" text="Next" />
  </Container>
)
