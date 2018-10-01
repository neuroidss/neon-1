import * as React from 'react'
import { Container } from '../../atoms/Container'
import { Button } from '../../atoms/Button'
import { Logo } from '../../atoms/Logo'

export class MainSelect extends React.Component<{}, {}> {

  public render() {
    return (
      <Container>
        <Logo />
        <Button preset="small" text="Create new Lightning wallet" />
        <Button preset="small" text="Recover existing Lightning wallet" />
      </Container>
    )
  }
}
