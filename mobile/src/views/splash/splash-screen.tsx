import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Button, Logo } from '@arcadecity/neon-ui'
import { loginStub } from '@arcadecity/neon-core'

export const SplashScreen = (props: any) => (
  <Container>
    <Logo />
    <Button onPress={loginStub} />
  </Container>
)
