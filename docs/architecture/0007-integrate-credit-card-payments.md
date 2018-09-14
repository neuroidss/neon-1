# 7. Integrate credit card payments

Date: 2018-09-14

## Status

Accepted

## Context

The vast majority of global ridesharing payments are made with credit cards attached to a user account in a mobile app.

We are excited to offer cryptocurrency payments alongside credit card payments so users have the choice for an option to pay with sound money and no fees.

But we are not willing to limit our customer base to only those comfortable with cryptocurrency.

We are also not willing to mandate that all credit card transactions take place within our mobile app, as the corporates like Uber do.

Most rides in our flagship Austin network use either cash, Venmo, or peer-to-peer credit card payments using a Square reader. Direct peer-to-peer payments outside our mobile apps will always remain an option and we won't penalize them.

But the reality of today's rideshare marketplace is that most consumers expect to be able to connect their credit card to a mobile app and pay through the app. We would be stupid not to acknowledge and support that reality.

## Decision

Offer optional credit card payments within a mobile app.

In-app payments will never be required, only an option. Drivers and riders can always transact peer to peer.

## Consequences

We need to create processes around security, chargebacks, fraud, and other traditional payment considerations.

We need to explore [multiple providers](0008-integrate-stripe.md) to ensure broad international coverage.
