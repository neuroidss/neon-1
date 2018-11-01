import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers'
import { Mutation, Query, Subscription } from './top'
import { Auth, AuthenticatedUserPayload, NewUserInput, User, UserInput, UserThirdPartAccount } from './user'
import { Message } from './chat'
import { directiveResolvers } from '../resolvers/directives'

export const schema = makeExecutableSchema({
  typeDefs: [
    Auth,
    UserThirdPartAccount,
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
