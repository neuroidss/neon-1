import * as admin from 'firebase-admin'
import { ApolloServer, PubSub } from 'apollo-server-express'
import { schema } from './src/schema'
import { config } from './authUtils'
import * as jwt from 'jsonwebtoken'

/**
 * Initialize Firebase
 */
const serviceAccount = require('../service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://arcadecityv22.firebaseio.com'
})

const firestore = admin.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings);

/**
 * Initialize Express and Apollo
 */
const express = require('express')
const http = require('http')
const app = express()
const PORT = process.env.PORT || 4000
export const pubsub = new PubSub()

const server = new ApolloServer({
  schema,
  engine: {
    apiKey: "service:arcade-city-pipes:a7bIS80QNs_LauzND1Gr3Q"
  },
  introspection: true,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Client connected to subscription')
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    }
  },
  context: ({ req }) => {
    const authorization = req.headers.authorization || ''
    if (authorization) {
      const token = authorization.replace('Bearer ', '')
      const user = jwt.verify(token, config.appSecret)
      return { user, req }
    } else {
      return { req }
    }
  }
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)   // Required to enable subscriptions
server.installSubscriptionHandlers(httpServer)

app.get('*', function (req, res) {
  res.redirect('https://arcade.city')
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
