import * as React from 'react'
import { Button, Container, Text } from '../../atoms'
import { SeedGrid } from './SeedGrid'

const explainer = "A recovery phrase is a group of words that will \
help you to recover your wallet if you lose your password or computer. \
Write it down and keep it in a safe place."

export const SeedShow = (props: any) => (
  <Container style={{ paddingHorizontal: '20%' }}>
    <Button
      preset="small"
      text="Back"
      onPress={props.goBack}
    />
    <Text preset="title" text="Save your recovery phrase" />
    <Text preset="title2" text={explainer} />
    <SeedGrid mnemonic={props.mnemonic} />
    <Button preset="small" text="Next" />
  </Container>
)
