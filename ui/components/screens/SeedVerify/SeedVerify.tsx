import * as React from 'react'
import { Button, Container, Text } from '../../atoms'
import { SeedEntry } from '../../atoms'

export const SeedVerify = () => (
  <Container>
    <Text preset="title" text="Confirm your recovery phrase" />
    <Text preset="title2" text="Type the 6th, 9th, and 17th words of your recovery phrase." />
    <SeedEntry seedIndex={6} />
    <SeedEntry seedIndex={9} />
    <SeedEntry seedIndex={17} />
    <Button preset="small" text="Next" />
  </Container>
)
