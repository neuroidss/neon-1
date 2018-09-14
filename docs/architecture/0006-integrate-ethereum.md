# 6. Integrate Ethereum

Date: 2018-09-14

## Status

Proposed

## Context

Since [January 2016](https://cointelegraph.com/news/arcade-city-decentralized-blockchain-based-answer-to-uber) we've announced our intent to build our decentralized ridesharing network on the Ethereum blockchain.

The vision of Ethereum as an unstoppable world computer able to support decentralized payments, identity, reputation, arbitration, governance and more - along with the repeated example given of Ethereum being able to power a decentralized Uber - had us excited to build our network on Ethereum.

Two years later, the Ethereum network still cannot scale to handle any serious userbase in production. In December 2017 the network was [brought to its knees](https://www.coindesk.com/loveable-digital-kittens-clogging-ethereums-blockchain/) by a decentralized Tamagotchi game with a few thousand daily users. Mainstream scalability seems to always remain "two years away".

Ethereum's founder [says](https://www.coindesk.com/vitalik-ethereum-app-builders-screwed-scaling-limits/), "If you want to build a decentralized Uber and Lyft on top of an unscalable ethereum, you are screwed. Full stop."

Well yes, our Ethereum integration plans got screwed. Fortunately we developed a different business model not reliant on Ethereum so we could be [active in today's rideshare marketplace](https://twitter.com/ArcadeCityHall/status/1040339439497736194) without worrying about blockchain-related bottlenecks.

We still have a foothold in the Ethereum ecosystem thanks to our ERC20 [Arcade Token](0005-integrate-arcade-tokens.md), for which we will build basic token management tools. 

## Decision

Explore simple, non-mission-critical uses of Ethereum, for example using [ERC900 staking](https://twitter.com/ArcadeCityHall/status/986810067654709248) of ARCD to geocoordinates.

Explore the potential for sidechains to provide a temporary answer to Ethereum scaling.

Focus for now on the Bitcoin/Lightning-related ["streaming money"](0003-integrate-lightning.md) functionality which is closer to production readiness.

## Consequences

Any Ethereum-based features are limited by the throughput, functionality and security of the Ethereum network.

We have uncertainty around how, when, or if we can build our full-featured decentralized network on Ethereum.