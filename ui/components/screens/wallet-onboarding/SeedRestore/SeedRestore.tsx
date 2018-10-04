import * as React from 'react'
import { Button, Container, Text } from '../../../atoms'
import { SeedEntry } from '../../../atoms'

export const SeedRestore = (props: any) => (
  <Container>
    <Button
      preset="small"
      text="Back"
      onPress={props.goBack}
    />
    <Text preset="title" text="Restore your wallet" />
    <Text preset="title2" text="Type the 1st, 2nd, and 3rd words of your recovery phrase." />
    <SeedEntry seedIndex={1} />
    <SeedEntry seedIndex={2} />
    <SeedEntry seedIndex={3} />
    <Button preset="small" text="Next" />
  </Container>
)
