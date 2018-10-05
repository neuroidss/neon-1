import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const SettingsUnits = () => (
  <Container>
    <Text preset="title2" text="Bitcoin units" />
    <Button preset="small" text="Satoshi (0.00000001 BTC)" />
    <Button preset="small" text="Bits (0.000001 BTC)" />
    <Button preset="small" text="Bitcoin" />
  </Container>
)
