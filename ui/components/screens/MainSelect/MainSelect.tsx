import * as React from 'react'
import { Button, Container, Logo } from '../../atoms'

export const MainSelect = () => (
  <Container>
    <Logo />
    <Button preset="small" text="Create new Lightning wallet" />
    <Button preset="small" text="Recover existing Lightning wallet" />
  </Container>
)
