import * as React from 'react'
import { Container, Text } from '../../atoms'

export const Loading = (props: any) => (
  <Container style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <Text text={props.text} />
  </Container>
)
