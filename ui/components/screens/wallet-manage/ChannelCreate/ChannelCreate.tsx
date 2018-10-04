import * as React from 'react'
import { Button, Container, InputField, Text } from '../../../atoms'

export const ChannelCreate = () => (
  <Container>
    <Text preset="title" text="Create channel" />
    <Text preset="title2" text="Add the amount you want in the channel, then the peer you would like to connect with." />
    <InputField />
    <InputField placeholder="Pubkey@HostIP" />
    <Button preset="small" text="Done" />
  </Container>
)
