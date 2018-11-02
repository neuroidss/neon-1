export const Mutation = `
  type Mutation {
    addMessage(text: String!, roomName: String!, user: UserInput!): Message @isAuthenticated
    login(idToken: String!): AuthenticatedUserPayload!
    saveUsername(username: String!): Boolean @isAuthenticated
  }

  input CustomerPaymentInfo {
    username: String!
    tokenID: String!
  }
`
