# 8. Integrate Stripe

Date: 2018-09-14

## Status

Accepted

## Context

Neon will [offer an option](0007-integrate-credit-card-payments.md) for users to transact with credit cards.

Stripe offers easy integration with specific [support for sharing economy platforms](https://stripe.com/connect).

## Decision

Use Stripe as initial provider for processing credit cards and paying drivers.

## Consequences

Stripe has easy integration and handles PCI compliance themselves.

Stripe supports payouts to only a [limited number of countries](https://stripe.com/global). We will need to explore other providers for broader international coverage.

Stripe has a steep transaction fee of 2.9% + $0.30. Maybe the fee could hasten a transition to cryptocurrency payments.