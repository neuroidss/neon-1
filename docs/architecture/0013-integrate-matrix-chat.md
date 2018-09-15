# 13. Integrate Matrix chat

Date: 2018-09-14

## Status

Proposed

## Context

Arcade City is the [first](https://twitter.com/ArcadeCityHall/status/930250418126557184) and only [group-forming network](http://wiki.p2pfoundation.net/Group_Forming_Networks) active in today's ridesharing marketplace.

Seamless communication is crucial for any group-forming network. For such network to be truly unstoppable, that communication must be encrypted end-to-end.

There are not many chat solutions that are decentralized, open-source, encrypted end-to-end, optimized for group chats, and also have a rich open ecosystem of SDKs and contributors.

[Matrix](https://matrix.org/blog/home/) stands out as the ideal solution for us. Though not a blockchain solution (and who cares?), we're happy that another major blockchain project, [Status](https://status.im/), liked them enough to invest [$5M in Matrix](https://blog.status.im/status-invests-5m-in-riot-im-4e3026a8bd50?gi=99a23c0bdbbb) and their main front-end client called Riot.

## Decision

Unless a better chat solution emerges, we will proceed to integrate Matrix as our core chat provider.

## Consequences

More work to integrate Matrix than our previous client-server chat implementations. Additional work to setup end-to-end encryption.

And what will teh governments think?!