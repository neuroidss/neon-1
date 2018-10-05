import * as React from 'react'
import { Button, Container, InputField, Text } from '../../../atoms'

export const PayLightning = () => (
  <Container>
    <Text preset="title" text="Lightning Payment" />
    <Text preset="title2" text="Paste the Lightning Payment Request or the Bitcoin Address to which you’re sending." />
    <InputField placeholder="Payment Request / Bitcoin Address" />
    <Button preset="small" text="Next" />
    <Text preset="title2" text="Only Lightning Payment Requests or Bitcoin addresses will work at this time." />
  </Container>
)
