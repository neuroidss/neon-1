# neon-server

Backend manager for third-party integrations, including [credit card processors](https://github.com/ArcadeCity/neon/blob/master/docs/architecture/0007-integrate-credit-card-payments.md) ([Stripe](https://github.com/ArcadeCity/neon/blob/master/docs/architecture/0008-integrate-stripe.md)) and [identity verifications](https://github.com/ArcadeCity/neon/blob/master/docs/architecture/0010-integrate-identity-verifications.md) ([EvidentID](https://github.com/ArcadeCity/neon/blob/master/docs/architecture/0011-integrate-evidentid.md)).

Ideally we should store no user data centrally. Can we save all user data like Stripe payment tokens via [Blockstack](https://github.com/ArcadeCity/neon/blob/master/docs/architecture/0012-integrate-blockstack.md) or another service without forfeiting mainstream user friendliness?

### Tech

* GraphQL via [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* TypeScript
* Firebase (?)