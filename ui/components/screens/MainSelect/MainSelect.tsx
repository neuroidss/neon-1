import * as React from 'react'
import { Button, Container, Logo } from '../../atoms'

interface MainSelectProps {
  navToCreateWallet: func
  navToRestoreWallet: func
}

export const MainSelect = (props: MainSelectProps) => (
  <Container>
    <Logo />
    <Button
      preset="small"
      onPress={props.navToCreateWallet}
      text="Create new Lightning wallet"
    />
    <Button
      preset="small"
      onPress={props.navToRestoreWallet}
      text="Recover existing Lightning wallet"
    />
  </Container>
)
