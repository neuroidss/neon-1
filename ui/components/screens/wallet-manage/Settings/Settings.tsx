import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const Settings = () => (
  <Container>
    <Text preset="title2" text="Settings" />
    <Button preset="small" text="Notifications: 5" />
    <Button preset="small" text="Bitcoin Unit: Bitcoin" />
    <Button preset="small" text="Fiat Currency: US Dollar" />
    <Button preset="small" text="Logs" />
  </Container>
)
