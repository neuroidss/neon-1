export const Mutation = `
  input CustomerPaymentInfo {
    username: String!
    tokenID: String!
  }  
  type Mutation {
    savePaymentMethod(customerInfo: CustomerPaymentInfo!): Boolean @isAuthenticated
    login(idToken: String!): AuthenticatedUserPayload!
    saveUsername(username: String!): Boolean @isAuthenticated
  }
`
