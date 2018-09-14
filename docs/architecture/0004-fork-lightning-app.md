# 4. Fork lightning-app

Date: 2018-09-14

## Status

Accepted

## Context

At the core of Neon will be a Bitcoin Lightning wallet to make possible [peer-to-peer payments](0002-integrate-bitcoin.md) and ["streaming money"](0003-integrate-lightning.md) for driver payouts and revenue sharing.

Starting with a fork of an existing open-source Lightning wallet will avoid making unnecessary mistakes by 'reinventing the wheel'.

Top priority in identifying a base wallet is a similar tech stack to our existing codebase, which is React, React Native, TypeScript, MobX, mobx-state-tree, Storybook, and universal components via React Native Web.

Of the available Lightning wallets, the [new Lightning app](https://blog.lightning.engineering/announcement/2018/09/10/lightning-app.html) by Lightning Labs uses the most similar stack (along with a beautiful design). It is just missing TypeScript and MST, which are easy enough to add in a refactor.

## Decision

Fork [lightning-app](https://github.com/lightninglabs/lightning-app) as a base for Neon.

## Consequences

We start with a mature codebase in line with modern best practices for cross-platform apps.

We will need to continue merging most of the latest commits made to lightning-app.


