import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'

export const Home = () => (
  <Container>
    <Text preset="title" text="Wallet" />
    <Text preset="title2" text="$164.16" />
    <Text preset="title2" text="Pending Deposit: $310.65" />
    <Button preset="small" text="Pay" />
    <Button preset="small" text="Request" />
    <Button preset="small" text="Channels" />
    <Button preset="small" text="Transactions" />
    <Button preset="small" text="Settings" />
  </Container>
)
