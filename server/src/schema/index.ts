import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers'
import { Mutation, Query, Subscription } from './top'
import { Auth, AuthenticatedUserPayload, NewUserInput, User, UserInput } from './user'
import { Message } from './chat'
import { Evident } from './evident'
import { directiveResolvers } from '../resolvers/directives'
import { UserThirdPartAccount } from './userThirdpartyAccount';

export const schema = makeExecutableSchema({
  typeDefs: [
    Auth,
    UserThirdPartAccount,
    AuthenticatedUserPayload,
    Message,
    Evident,
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
