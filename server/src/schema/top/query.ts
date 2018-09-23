export const Query = `
  type Query {
    message(id: String!): Message @isAuthenticated
    lastMessages(last: Int!): [Message] @isAuthenticated
  }
`
