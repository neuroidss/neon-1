import * as React from 'react'
import { Container } from '../../../atoms/Container'
import { Logo } from '../../../atoms/Logo'

export class Splash extends React.Component<{}, {}> {

  public render() {
    return (
      <Container>
        <Logo />
      </Container>
    )
  }
}
