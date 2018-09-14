# 12. Integrate Blockstack

Date: 2018-09-14

## Status

Proposed

## Context

[Blockstack](https://blockstack.org/) is "a new internet for decentralized apps where users own their data directly," backed by the [Bitcoin](0002-integrate-bitcoin.md) blockchain.

We've previously used Firebase for authentication and database backend, intending to switch to more decentralized services when production-ready.

Blockstack clearly positions themselves as a decentralized alternative to Firebase on their [website homepage](https://blockstack.org/).

If we can use Blockstack to replace Firebase and generally the centralized client-server model without sacrificing too much in usability, it may be worth building on Blockstack sooner than later.

## Decision

Explore production readiness of Blockstack for our use case. Start by adding Blockstack authentication to our [refactored Lightning wallet](0004-fork-lightning-app.md).

## Consequences

Potential trade-offs with usability. Any friction added to the user onboarding process ("First download Blockstack Browser") may hamper userbase growth.
