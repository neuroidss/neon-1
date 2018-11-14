export const Mutation = `
  input CustomerPaymentInfo {
    username: String!
    tokenID: String!
  }
  input RegisterInfo {
    username: String!
    firstname: String!
    lastname: String!
    emailAddress: String!
    password: String!
  }
  type Mutation {
    savePaymentMethod(customerInfo: CustomerPaymentInfo!): Boolean @isAuthenticated
    submitDataToEvidentID(idToken: String!, documentVerificationInput: DocumentVerificationInput): User @isAuthenticated
    login(idToken: String!): AuthenticatedUserPayload! @isAuthenticated
    saveUsername(username: String!): Boolean @isAuthenticated
    register(registerInfo: RegisterInfo!): AuthenticatedUserPayload! @isAuthenticated
  }
`
