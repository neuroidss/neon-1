export const Mutation = `
  type Mutation {
    addMessage(text: String!, roomName: String!, user: UserInput!): Message @isAuthenticated
    login(idToken: String!): AuthenticatedUserPayload!
    saveUsername(username: String!): Boolean @isAuthenticated
    saveCreditCard(username: String!): Boolean
  }

  type CreditCard {
    
  }
`
