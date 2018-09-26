export const Auth = `
  directive @isAuthenticated on QUERY | FIELD | MUTATION
`

export const User = `
  type User {
    id: ID
    fbid: String
    name: String!
    photo: String!
    email: String!
    link: String!
    firebaseId: String!
    providerId: String!
    username: String
    role: String
    bio: String
  }
`

export const AuthenticatedUserPayload = `
  type AuthenticatedUserPayload {
    user: User!
    accessToken: String!
    refreshToken: String!
  }
`

export const UserInput = `
  input UserInput {
    id: ID!
    fbid: String!
    name: String!
    photo: String!
  }
`

export const NewUserInput = `
  input NewUserInput {
    email: String!
    firebaseId: String!
    link: String!
    name: String!
    photo: String!
    providerId: String!
  }
`
