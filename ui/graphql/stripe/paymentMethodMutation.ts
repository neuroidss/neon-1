import gql from 'graphql-tag'
export const PaymentMutation = gql`

mutation savePaymentMethod($customerInfo: CustomerPaymentInfo!){
  savePaymentMethod(customerInfo: $customerInfo)
}
`