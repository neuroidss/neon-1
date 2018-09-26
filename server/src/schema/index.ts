import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers'
import { Mutation, Query, Subscription } from './top'
import { Auth, AuthenticatedUserPayload, NewUserInput, User, UserInput } from './user'
import { Message } from './chat'
import { directiveResolvers } from '../resolvers/directives'

export const schema = makeExecutableSchema({
  typeDefs: [
    Auth,
    AuthenticatedUserPayload,
    Message,
    Mutation,
    NewUserInput,
    Subscription,
    Query,
    User,
    UserInput
  ],
  resolvers,
  directiveResolvers
})
