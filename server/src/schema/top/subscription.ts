export const Subscription = `
  type Subscription {
    messageAdded(roomName: String!): Message @isAuthenticated
  }
`
