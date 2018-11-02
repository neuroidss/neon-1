import gql from 'graphql-tag'
export const PaymentMutation = gql`
{
    user(id: 5) {
      firstName
      lastName
    }
  }
`