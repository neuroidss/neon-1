import * as React from 'react'
import { Button, Container, InputField, Text } from '../../../atoms'

export const PayBitcoin = () => (
  <Container>
    <Text preset="title" text="On-Chain Payment" />
    <Text preset="title2" text="You are about to initiate an on-chain payment. It could take 10 minutes or more to confirm." />
    <InputField placeholder="$0" />
    <InputField placeholder="Bitcoin Address" />
    <Button preset="small" text="Next" />
  </Container>
)
