import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const SettingsFiat = () => (
  <Container>
    <Text preset="title2" text="Fiat currency" />
    <Button preset="small" text="US Dollar" />
    <Button preset="small" text="Euro" />
    <Button preset="small" text="British Pound" />
  </Container>
)
