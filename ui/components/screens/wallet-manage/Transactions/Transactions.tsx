import * as React from 'react'
import { Container, Text } from '../../../atoms'

export const Transactions = () => (
  <Container>
    <Text preset="title" text="Transactions" />
    <Text preset="title2" text="Unit | Status | Date | Transaction/Invoice ID | Amount | Fee" />
    <Text preset="title2" text="L | Complete | 10/4/2018 | 891824912892183j | $5.67 | $0.00" />
    <Text preset="title2" text="B | Unconfirmed | 10/4/2018 | 89182491sdf2892183j | $745.67 | $0.00" />
  </Container>
)
