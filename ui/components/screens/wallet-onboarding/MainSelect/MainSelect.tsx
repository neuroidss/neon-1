import * as React from 'react'
import { Button, Container, Logo } from '../../../atoms'

interface MainSelectProps {
  navToCreateWallet: () => void
  navToRestoreWallet: () => void
}

export const MainSelect = (props: MainSelectProps) => (
  <Container>
    <Logo />
    <Button
      preset="small"
      text="Create new Lightning wallet"
      onPress={props.navToCreateWallet}
    />
    <Button
      preset="small"
      text="Recover existing Lightning wallet"
      onPress={props.navToRestoreWallet}
    />
  </Container>
)
