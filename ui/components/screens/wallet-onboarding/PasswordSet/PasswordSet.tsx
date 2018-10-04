import * as React from 'react'
import { Button, Container, InputField, Text } from '../../../atoms'

export const PasswordSet = () => (
  <Container>
    <Text preset="title" text="Set a password" />
    <Text preset="title2" text="The password must be at least 8 characters long and is used to protect your wallet on disk." />
    <InputField />
    <InputField />
    <Button preset="small" text="Next" />
  </Container>
)
