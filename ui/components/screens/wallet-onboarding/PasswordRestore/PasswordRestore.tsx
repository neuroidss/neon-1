import * as React from 'react'
import { Button, Container, InputField, Text } from '../../../atoms'

export const PasswordRestore = () => (
  <Container>
    <Text preset="title" text="Unlock Wallet" />
    <Text preset="title2" text="Please enter your password" />
    <InputField placeholder="Password" />
    <Button preset="small" text="Next" />
  </Container>
)
